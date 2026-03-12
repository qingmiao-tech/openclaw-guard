[CmdletBinding()]
param(
    [ValidateSet("Preview", "Push", "Pull")]
    [string]$Action = "Preview",
    [string]$Prefix = "openclaw-guard",
    [string]$Remote = "",
    [string]$RemoteUrl = "https://github.com/qingmiao-tech/openclaw-guard.git",
    [string]$Branch = "main",
    [string]$SourceRef = "HEAD",
    [switch]$AllowDirtyPrefix,
    [switch]$Squash
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Invoke-GitCapture {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$Args,
        [switch]$AllowFailure
    )

    $stdoutFile = [System.IO.Path]::GetTempFileName()
    $stderrFile = [System.IO.Path]::GetTempFileName()

    try {
        $process = Start-Process -FilePath "git" -ArgumentList $Args -NoNewWindow -Wait -PassThru -RedirectStandardOutput $stdoutFile -RedirectStandardError $stderrFile
        $exitCode = $process.ExitCode
        $stdoutLines = if (Test-Path $stdoutFile) { @(Get-Content -Path $stdoutFile -Encoding UTF8) } else { @() }
        $stderrLines = if (Test-Path $stderrFile) { @(Get-Content -Path $stderrFile -Encoding UTF8) } else { @() }
        $lines = @()
        $lines += @($stdoutLines)
        $lines += @($stderrLines)
        $lines = @($lines | ForEach-Object { "$_" })
        $text = ($lines -join "`n").Trim()
    }
    finally {
        Remove-Item -Path $stdoutFile -Force -ErrorAction SilentlyContinue
        Remove-Item -Path $stderrFile -Force -ErrorAction SilentlyContinue
    }

    if ($exitCode -ne 0 -and -not $AllowFailure) {
        throw "git $($Args -join ' ') failed.`n$text"
    }

    [pscustomobject]@{
        ExitCode = $exitCode
        Lines = $lines
        Text = $text
    }
}

function Resolve-RepoRoot {
    $root = (Invoke-GitCapture -Args @("rev-parse", "--show-toplevel")).Text.Trim()
    if ([string]::IsNullOrWhiteSpace($root)) {
        throw "Unable to resolve git repository root."
    }
    return $root
}

function Resolve-Target {
    param(
        [string]$RemoteName,
        [string]$RemoteLocation
    )

    if (-not [string]::IsNullOrWhiteSpace($RemoteName)) {
        return [pscustomobject]@{
            Value = $RemoteName
            Label = "remote '$RemoteName'"
        }
    }

    if (-not [string]::IsNullOrWhiteSpace($RemoteLocation)) {
        return [pscustomobject]@{
            Value = $RemoteLocation
            Label = $RemoteLocation
        }
    }

    throw "Either -Remote or -RemoteUrl must be provided."
}

function Get-PrefixStatus {
    param([string]$PrefixPath)

    $result = Invoke-GitCapture -Args @("status", "--porcelain", "--", $PrefixPath)
    $lines = @($result.Lines | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })
    return $lines
}

function Ensure-CleanPrefix {
    param(
        [string]$PrefixPath,
        [switch]$Bypass
    )

    $lines = Get-PrefixStatus -PrefixPath $PrefixPath
    if ($lines.Count -gt 0 -and -not $Bypass) {
        $details = ($lines -join "`n")
        throw "Detected uncommitted changes under '$PrefixPath'. Commit or stash them before '$Action'.`n$details"
    }
    return $lines
}

function Get-SplitHash {
    param(
        [string]$PrefixPath,
        [string]$Ref
    )

    $result = Invoke-GitCapture -Args @("subtree", "split", "--prefix=$PrefixPath", $Ref)
    $hashMatch = [regex]::Match($result.Text, "(?m)^[0-9a-f]{7,40}$")
    $hash = if ($hashMatch.Success) { $hashMatch.Value } else { $null }

    if ([string]::IsNullOrWhiteSpace($hash)) {
        throw "Unable to resolve subtree split hash for '$PrefixPath' from ref '$Ref'."
    }

    return $hash
}

function Get-RemoteHead {
    param(
        [string]$TargetValue,
        [string]$TargetBranch
    )

    $result = Invoke-GitCapture -Args @("ls-remote", $TargetValue, "refs/heads/$TargetBranch") -AllowFailure
    if ($result.ExitCode -ne 0) {
        throw "Unable to inspect remote branch '$TargetBranch' on '$TargetValue'.`n$($result.Text)"
    }

    $line = @($result.Lines | Where-Object { $_ -match "^[0-9a-f]{40}\s+refs/heads/" }) | Select-Object -First 1
    if ([string]::IsNullOrWhiteSpace($line)) {
        return $null
    }

    return ($line -split "\s+", 2)[0]
}

$repoRoot = Resolve-RepoRoot
Set-Location $repoRoot

$prefixFullPath = Join-Path $repoRoot $Prefix
if (-not (Test-Path $prefixFullPath)) {
    throw "Prefix path not found: $prefixFullPath"
}

$target = Resolve-Target -RemoteName $Remote -RemoteLocation $RemoteUrl
$currentBranch = (Invoke-GitCapture -Args @("branch", "--show-current")).Text.Trim()
$dirtyPrefixLines = Get-PrefixStatus -PrefixPath $Prefix
$splitHash = Get-SplitHash -PrefixPath $Prefix -Ref $SourceRef
$remoteHead = Get-RemoteHead -TargetValue $target.Value -TargetBranch $Branch

Write-Host ""
Write-Host "OpenClaw Guard public sync"
Write-Host "Repo root     : $repoRoot"
Write-Host "Current branch: $currentBranch"
Write-Host "Prefix        : $Prefix"
Write-Host "Source ref    : $SourceRef"
Write-Host "Target        : $($target.Label)"
Write-Host "Target branch : $Branch"
Write-Host "Split commit  : $splitHash"
Write-Host ("Remote head   : {0}" -f ($(if ($remoteHead) { $remoteHead } else { "(branch not found yet)" })))
Write-Host ("Dirty prefix  : {0}" -f ($(if ($dirtyPrefixLines.Count -gt 0) { "$($dirtyPrefixLines.Count) path(s)" } else { "clean" })))
Write-Host ""

switch ($Action) {
    "Preview" {
        if ($dirtyPrefixLines.Count -gt 0) {
            Write-Warning "Preview uses committed history only. The following prefix changes are not part of the split yet:"
            $dirtyPrefixLines | ForEach-Object { Write-Host "  $_" }
            Write-Host ""
        }

        if ($remoteHead -and $remoteHead -eq $splitHash) {
            Write-Host "Public repo is already aligned with the current subtree split."
        }
        else {
            Write-Host "Next push command:"
            Write-Host "  git push $($target.Value) $splitHash`:refs/heads/$Branch"
        }

        Write-Host ""
        Write-Host "Pull command (to bring public repo commits back into the monorepo):"
        if ($Squash) {
            Write-Host "  git subtree pull --prefix=$Prefix --squash $($target.Value) $Branch"
        }
        else {
            Write-Host "  git subtree pull --prefix=$Prefix $($target.Value) $Branch"
        }
    }
    "Push" {
        [void](Ensure-CleanPrefix -PrefixPath $Prefix -Bypass:$AllowDirtyPrefix)

        if ($remoteHead -and $remoteHead -eq $splitHash) {
            Write-Host "Nothing to push. Public repo already matches split commit $splitHash."
            break
        }

        Invoke-GitCapture -Args @("push", $target.Value, "$splitHash`:refs/heads/$Branch") | Out-Null
        Write-Host "Push completed: $splitHash -> $($target.Label) ($Branch)"
    }
    "Pull" {
        [void](Ensure-CleanPrefix -PrefixPath $Prefix -Bypass:$AllowDirtyPrefix)

        $pullArgs = @("subtree", "pull", "--prefix=$Prefix")
        if ($Squash) {
            $pullArgs += "--squash"
        }
        $pullArgs += @($target.Value, $Branch)

        Invoke-GitCapture -Args $pullArgs | Out-Null
        $newHead = (Invoke-GitCapture -Args @("rev-parse", "--short", "HEAD")).Text.Trim()
        Write-Host "Pull completed into monorepo branch '$currentBranch'. New HEAD: $newHead"
    }
}
