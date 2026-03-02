[CmdletBinding()]
param(
    [int]$TopN = 14,
    [string]$PrimaryRepoPath = "",
    [string]$FeishuRepoPath = "",
    [string]$OutputPath = "",
    [ValidateSet("zh-CN", "en")] [string]$Language = "zh-CN",
    [switch]$InsertIntoLog,
    [string]$LogPath = "",
    [string]$TaskId = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Convert-UnicodeEscapes {
    param([string]$Text)
    return [System.Text.RegularExpressions.Regex]::Replace(
        $Text,
        "\\u([0-9a-fA-F]{4})",
        { param($m) [char]([Convert]::ToInt32($m.Groups[1].Value, 16)) }
    )
}

function Get-LanguagePack {
    param([ValidateSet("zh-CN", "en")] [string]$Lang)

    if ($Lang -eq "zh-CN") {
        return @{
            SectionTitle = Convert-UnicodeEscapes "\u9879\u76ee\u8fd1\u51b5\u57fa\u7ebf\uff08\u6700\u8fd1 {0} \u6279\uff0c\u53cc\u4ed3\u5408\u5e76\uff09"
            GeneratedAtLabel = Convert-UnicodeEscapes "\u7edf\u8ba1\u65f6\u95f4"
            ScopeLabel = Convert-UnicodeEscapes "\u7edf\u8ba1\u53e3\u5f84"
            ScopeText = Convert-UnicodeEscapes "`openclaw-course + openclaw-feishu` \u5408\u5e76\u540e\u6309\u63d0\u4ea4\u65f6\u95f4\u964d\u5e8f\u53d6 {0} \u6761\u3002"
            TimeWindowLabel = Convert-UnicodeEscapes "\u65f6\u95f4\u7a97\u53e3"
            TimeWindowSuffix = Convert-UnicodeEscapes "\uff08\u5317\u4eac\u65f6\u95f4\uff09"
            TimeRangeConnector = Convert-UnicodeEscapes "\u81f3"
            RepoShareLabel = Convert-UnicodeEscapes "\u4e24\u4ed3\u5360\u6bd4"
            ThemeLabel = Convert-UnicodeEscapes "\u4e3b\u9898\u805a\u7c7b"
            RisksLabel = Convert-UnicodeEscapes "\u98ce\u9669\u4e0e\u5f85\u529e"
            SummaryLabel = Convert-UnicodeEscapes "\u6700\u8fd1 {0} \u6279\u63d0\u4ea4\u6458\u8981\uff08\u63d0\u4ea4\u7ea7\uff0c\u4e0d\u5c55\u5f00\u9010\u6587\u4ef6 diff\uff09"
            BranchRisk = Convert-UnicodeEscapes "`{0}` \u5206\u652f `{1}`\uff08ahead={2}, behind={3}\uff09\uff0c\u5efa\u8bae\u540c\u6b65\u8fdc\u7aef\u3002"
            UntrackedRisk = Convert-UnicodeEscapes "`{0}` \u5b58\u5728\u672a\u8ddf\u8e2a\u6587\u4ef6 {1} \u4e2a\uff0c\u5efa\u8bae\u786e\u8ba4\u662f\u5426\u7eb3\u5165\u7248\u672c\u63a7\u5236\u3002"
            DowngradedRisk = Convert-UnicodeEscapes "\u5df2\u964d\u7ea7\u4e3a\u53ef\u8bbf\u95ee\u4ed3\u7edf\u8ba1\u3002\u4e0d\u53ef\u8bbf\u95ee\u4ed3: {0}\u3002"
            InsufficientRisk = Convert-UnicodeEscapes "\u53ef\u7528\u63d0\u4ea4\u4e0d\u8db3 {0} \u6761\uff0c\u5f53\u524d\u4ec5\u6536\u96c6 {1} \u6761\u3002"
            NoRisk = Convert-UnicodeEscapes "\u5f53\u524d\u672a\u68c0\u6d4b\u5230\u5206\u652f\u540c\u6b65\u6216\u672a\u8ddf\u8e2a\u6587\u4ef6\u98ce\u9669\u3002"
            ThemeMap = @{
                "course-and-docs" = Convert-UnicodeEscapes "\u8bfe\u7a0b\u4e0e\u6587\u6863"
                "openclaw-guard" = "OpenClaw Guard"
                "feishu-upstream-sync" = Convert-UnicodeEscapes "\u98de\u4e66\u4e0a\u6e38\u540c\u6b65"
                "feishu-customization" = Convert-UnicodeEscapes "\u98de\u4e66\u5b9a\u5236\u80fd\u529b"
                "other" = Convert-UnicodeEscapes "\u5176\u4ed6"
            }
        }
    }

    return @{
        SectionTitle = "Project Baseline (Recent {0} Commits, Combined)"
        GeneratedAtLabel = "Generated At"
        ScopeLabel = "Scope"
        ScopeText = "openclaw-course + openclaw-feishu, sorted by commit time desc and truncated to top {0}."
        TimeWindowLabel = "Time Window"
        TimeWindowSuffix = "(local time)"
        TimeRangeConnector = "to"
        RepoShareLabel = "Repo Share"
        ThemeLabel = "Theme Clusters"
        RisksLabel = "Risks/TODOs"
        SummaryLabel = "Recent {0} Commit Summary (commit-level)"
        BranchRisk = "{0} branch '{1}' has ahead={2}, behind={3}."
        UntrackedRisk = "{0} has {1} untracked file(s)."
        DowngradedRisk = "Downgraded to available repos only. Unavailable repos: {0}."
        InsufficientRisk = "Only {1} commit(s) could be collected (requested: {0})."
        NoRisk = "No branch sync or untracked-file risk detected."
        ThemeMap = @{
            "course-and-docs" = "course-and-docs"
            "openclaw-guard" = "openclaw-guard"
            "feishu-upstream-sync" = "feishu-upstream-sync"
            "feishu-customization" = "feishu-customization"
            "other" = "other"
        }
    }
}

function Invoke-GitLines {
    param(
        [Parameter(Mandatory = $true)][string]$RepoPath,
        [Parameter(Mandatory = $true)][string[]]$Args
    )

    $lines = & git -C $RepoPath @Args 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "git command failed in '$RepoPath': git $($Args -join ' ')"
    }
    return @($lines)
}

function Parse-BranchStatus {
    param([string]$BranchLine)

    $result = [ordered]@{
        Branch = "unknown"
        Ahead = 0
        Behind = 0
        Raw = $BranchLine
    }

    if ([string]::IsNullOrWhiteSpace($BranchLine)) {
        return [pscustomobject]$result
    }

    $trimmed = $BranchLine.Trim()
    if ($trimmed.StartsWith("## ")) {
        $trimmed = $trimmed.Substring(3)
    }

    $result.Branch = ($trimmed -split "\s+\[", 2)[0]

    if ($trimmed -match "\[ahead\s+(\d+),\s*behind\s+(\d+)\]") {
        $result.Ahead = [int]$Matches[1]
        $result.Behind = [int]$Matches[2]
        return [pscustomobject]$result
    }
    if ($trimmed -match "\[behind\s+(\d+),\s*ahead\s+(\d+)\]") {
        $result.Behind = [int]$Matches[1]
        $result.Ahead = [int]$Matches[2]
        return [pscustomobject]$result
    }
    if ($trimmed -match "\[ahead\s+(\d+)\]") {
        $result.Ahead = [int]$Matches[1]
    }
    if ($trimmed -match "\[behind\s+(\d+)\]") {
        $result.Behind = [int]$Matches[1]
    }

    return [pscustomobject]$result
}

function Get-Theme {
    param([pscustomobject]$Commit)

    $subject = $Commit.Subject.ToLowerInvariant()
    if ($Commit.RepoName -eq "openclaw-feishu") {
        if ($subject -match "merge upstream|sync: merge official|upstream") {
            return "feishu-upstream-sync"
        }
        return "feishu-customization"
    }

    if ($subject -match "openclaw-guard|guard") {
        return "openclaw-guard"
    }
    if ($subject -match "docs|lab|day|course|memory|search|index") {
        return "course-and-docs"
    }
    return "other"
}

function Insert-ReportIntoLog {
    param(
        [Parameter(Mandatory = $true)][string]$TargetLogPath,
        [Parameter(Mandatory = $true)][string]$ReportBlock,
        [string]$TargetTaskId = ""
    )

    if (-not (Test-Path $TargetLogPath)) {
        throw "Log file not found: $TargetLogPath"
    }

    $content = Get-Content -Path $TargetLogPath -Raw -Encoding UTF8
    $taskMatches = [System.Text.RegularExpressions.Regex]::Matches(
        $content,
        "(?m)^## \[[^\n]+\].*\[TASK-\d{8}-\d+\]"
    )

    if ($taskMatches.Count -eq 0) {
        throw "No task section found in $TargetLogPath"
    }

    $selected = $null
    if ([string]::IsNullOrWhiteSpace($TargetTaskId)) {
        $selected = $taskMatches[0]
    } else {
        foreach ($m in $taskMatches) {
            if ($m.Value.Contains("[$TargetTaskId]")) {
                $selected = $m
                break
            }
        }
        if ($null -eq $selected) {
            throw "Task '$TargetTaskId' not found in $TargetLogPath"
        }
    }

    $selectedIdx = [Array]::IndexOf($taskMatches, $selected)
    $taskStart = $selected.Index
    $taskEnd = $content.Length
    if ($selectedIdx -lt $taskMatches.Count - 1) {
        $taskEnd = $taskMatches[$selectedIdx + 1].Index
    }

    $taskSection = $content.Substring($taskStart, $taskEnd - $taskStart)
    $zhBaseline = Convert-UnicodeEscapes "\u9879\u76ee\u8fd1\u51b5\u57fa\u7ebf\uff08\u6700\u8fd1 \d+ \u6279\uff0c\u53cc\u4ed3\u5408\u5e76\uff09"
    $baselineMatch = [System.Text.RegularExpressions.Regex]::Match($taskSection, "(?ms)^### (Project Baseline \(Recent \d+ Commits, Combined\)|$zhBaseline).*")

    if ($baselineMatch.Success) {
        $taskSection = $taskSection.Substring(0, $baselineMatch.Index).TrimEnd() + "`r`n`r`n" + $ReportBlock + "`r`n"
    } else {
        $taskSection = $taskSection.TrimEnd() + "`r`n`r`n" + $ReportBlock + "`r`n"
    }

    $newContent = $content.Substring(0, $taskStart) + $taskSection + $content.Substring($taskEnd)
    Set-Content -Path $TargetLogPath -Value $newContent -Encoding UTF8
}

if ([string]::IsNullOrWhiteSpace($PrimaryRepoPath)) {
    $PrimaryRepoPath = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
}
if ([string]::IsNullOrWhiteSpace($FeishuRepoPath)) {
    $FeishuRepoPath = Join-Path $PrimaryRepoPath "openclaw-feishu"
}

$lang = Get-LanguagePack -Lang $Language

$repos = @(
    [pscustomobject]@{ Name = "openclaw-course"; Path = $PrimaryRepoPath },
    [pscustomobject]@{ Name = "openclaw-feishu"; Path = $FeishuRepoPath }
)

$statusByRepo = @{}
$unavailableRepos = New-Object System.Collections.Generic.List[string]
$allCommits = New-Object System.Collections.Generic.List[object]
$fetchCount = [Math]::Max($TopN * 3, 40)

foreach ($repo in $repos) {
    $gitDir = Join-Path $repo.Path ".git"
    if (-not (Test-Path $gitDir)) {
        $unavailableRepos.Add("$($repo.Name) ($($repo.Path))")
        continue
    }

    try {
        $statusLines = Invoke-GitLines -RepoPath $repo.Path -Args @("status", "--short", "--branch")
        $branchInfo = Parse-BranchStatus -BranchLine $statusLines[0]
        $untrackedCount = @($statusLines | Where-Object { $_ -like "?? *" }).Count
        $headHash = (Invoke-GitLines -RepoPath $repo.Path -Args @("rev-parse", "--short", "HEAD"))[0]

        $statusByRepo[$repo.Name] = [pscustomobject]@{
            RepoPath = $repo.Path
            Branch = $branchInfo.Branch
            Ahead = $branchInfo.Ahead
            Behind = $branchInfo.Behind
            Head = $headHash
            UntrackedCount = $untrackedCount
        }
    }
    catch {
        $unavailableRepos.Add("$($repo.Name) ($($repo.Path)): $($_.Exception.Message)")
        continue
    }

    try {
        $logLines = Invoke-GitLines -RepoPath $repo.Path -Args @(
            "log",
            "-n",
            "$fetchCount",
            "--date=iso-local",
            "--pretty=format:%ct|%h|%ad|%an|%s"
        )

        foreach ($line in $logLines) {
            if ([string]::IsNullOrWhiteSpace($line)) { continue }
            $parts = $line -split "\|", 5
            if ($parts.Count -lt 5) { continue }

            $ts = [int64]$parts[0]
            $localTime = [DateTimeOffset]::FromUnixTimeSeconds($ts).ToLocalTime().DateTime
            $allCommits.Add([pscustomobject]@{
                Ts = $ts
                LocalTime = $localTime
                RepoName = $repo.Name
                Hash = $parts[1]
                DateRaw = $parts[2]
                Author = $parts[3]
                Subject = $parts[4]
            })
        }
    }
    catch {
        $unavailableRepos.Add("$($repo.Name) ($($repo.Path)): $($_.Exception.Message)")
    }
}

if ($allCommits.Count -eq 0) {
    throw "No commits could be collected from configured repositories."
}

$topCommits = @($allCommits | Sort-Object Ts -Descending | Select-Object -First $TopN)
$windowStart = ($topCommits | Sort-Object Ts | Select-Object -First 1).LocalTime
$windowEnd = ($topCommits | Sort-Object Ts -Descending | Select-Object -First 1).LocalTime
$generatedAt = Get-Date
$total = $topCommits.Count

$repoShare = @($topCommits | Group-Object RepoName | Sort-Object Count -Descending)
$themeShare = @(
    $topCommits |
    ForEach-Object { [pscustomobject]@{ Theme = (Get-Theme -Commit $_) } } |
    Group-Object Theme |
    Sort-Object Count -Descending
)

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine(("### {0}" -f ($lang.SectionTitle -f $TopN)))
[void]$sb.AppendLine("")
[void]$sb.AppendLine(("- {0}: {1}" -f $lang.GeneratedAtLabel, $generatedAt.ToString("yyyy-MM-dd HH:mm")))
[void]$sb.AppendLine(("- {0}: {1}" -f $lang.ScopeLabel, ($lang.ScopeText -f $TopN)))
[void]$sb.AppendLine(("- {0}: {1} {2} {3} {4}" -f $lang.TimeWindowLabel, $windowStart.ToString("yyyy-MM-dd HH:mm"), $lang.TimeRangeConnector, $windowEnd.ToString("yyyy-MM-dd HH:mm"), $lang.TimeWindowSuffix))

$shareParts = @()
foreach ($group in $repoShare) {
    $pct = [Math]::Round(($group.Count * 100.0 / $total), 1)
    $shareParts += "$($group.Name) $($group.Count)/$total ($pct`%)"
}
[void]$sb.AppendLine(("- {0}: {1}" -f $lang.RepoShareLabel, ($shareParts -join "; ")))

[void]$sb.AppendLine(("- {0}:" -f $lang.ThemeLabel))
foreach ($group in $themeShare) {
    $pct = [Math]::Round(($group.Count * 100.0 / $total), 1)
    $themeLabel = $lang.ThemeMap[$group.Name]
    if ([string]::IsNullOrWhiteSpace($themeLabel)) {
        $themeLabel = $group.Name
    }
    [void]$sb.AppendLine(("  1) {0}: {1}/{2} ({3}`%)" -f $themeLabel, $group.Count, $total, $pct))
}

[void]$sb.AppendLine(("- {0}:" -f $lang.RisksLabel))
$riskLines = New-Object System.Collections.Generic.List[string]
foreach ($repo in $repos) {
    if (-not $statusByRepo.ContainsKey($repo.Name)) { continue }
    $status = $statusByRepo[$repo.Name]
    if ($status.Ahead -gt 0 -or $status.Behind -gt 0) {
        $riskLines.Add(($lang.BranchRisk -f $repo.Name, $status.Branch, $status.Ahead, $status.Behind))
    }
    if ($status.UntrackedCount -gt 0) {
        $riskLines.Add(($lang.UntrackedRisk -f $repo.Name, $status.UntrackedCount))
    }
}
if ($unavailableRepos.Count -gt 0) {
    $riskLines.Add(($lang.DowngradedRisk -f ($unavailableRepos -join "; ")))
}
if ($topCommits.Count -lt $TopN) {
    $riskLines.Add(($lang.InsufficientRisk -f $TopN, $topCommits.Count))
}
if ($riskLines.Count -eq 0) {
    [void]$sb.AppendLine(("  1) {0}" -f $lang.NoRisk))
}
else {
    foreach ($line in $riskLines) {
        [void]$sb.AppendLine(("  1) {0}" -f $line))
    }
}

[void]$sb.AppendLine(("- {0}:" -f ($lang.SummaryLabel -f $TopN)))
foreach ($commit in $topCommits) {
    $timeText = $commit.LocalTime.ToString("yyyy-MM-dd HH:mm")
    $subject = ($commit.Subject -replace "\r", " " -replace "\n", " ").Trim()
    [void]$sb.AppendLine("  - $timeText | $($commit.RepoName) | $($commit.Hash) | $($commit.Author) | $subject")
}

$report = $sb.ToString().TrimEnd()

if (-not [string]::IsNullOrWhiteSpace($OutputPath)) {
    $outputDir = Split-Path -Path $OutputPath -Parent
    if (-not [string]::IsNullOrWhiteSpace($outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }
    Set-Content -Path $OutputPath -Value $report -Encoding UTF8
    Write-Output "Report written to: $OutputPath"
}

if ($InsertIntoLog) {
    if ([string]::IsNullOrWhiteSpace($LogPath)) {
        $LogPath = Join-Path $PrimaryRepoPath "worklogs/codex-work-logs.md"
    }
    Insert-ReportIntoLog -TargetLogPath $LogPath -ReportBlock $report -TargetTaskId $TaskId
    Write-Output "Report inserted into log: $LogPath"
}

Write-Output $report
