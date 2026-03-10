param(
  [string]$ConfigPath = "$env:USERPROFILE\.openclaw\openclaw.json",
  [string]$TargetRoot = "$env:USERPROFILE\.openclaw\nk-self",
  [string]$RenderedConfigPath = '',
  [string]$Model = '',
  [switch]$ApplyToMainConfig
)

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$nkRoot = Resolve-Path (Join-Path $scriptDir '..')
$templatePath = Join-Path $nkRoot 'openclaw.personal.final.json'
$mergeScript = Join-Path $scriptDir 'init-nk-self.mjs'
$sourceWorkspaces = Join-Path $nkRoot 'workspaces'
$targetWorkspaces = Join-Path $TargetRoot 'workspaces'

if (-not $RenderedConfigPath) {
  $RenderedConfigPath = Join-Path $TargetRoot 'openclaw.personal.final.json'
}

if (-not (Test-Path $templatePath)) {
  throw "Template not found: $templatePath"
}
if (-not (Test-Path $mergeScript)) {
  throw "Merge script not found: $mergeScript"
}
if (-not (Test-Path $sourceWorkspaces)) {
  throw "Workspace source not found: $sourceWorkspaces"
}

New-Item -ItemType Directory -Path $TargetRoot -Force | Out-Null
New-Item -ItemType Directory -Path $targetWorkspaces -Force | Out-Null

Copy-Item -Path (Join-Path $sourceWorkspaces '*') -Destination $targetWorkspaces -Recurse -Force
Write-Host "[ok] copied workspaces to $targetWorkspaces"

if ($ApplyToMainConfig -and (Test-Path $ConfigPath)) {
  $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  $backupPath = "$ConfigPath.bak-$stamp"
  Copy-Item -Path $ConfigPath -Destination $backupPath -Force
  Write-Host "[backup] $backupPath"
}

$nodeArgs = @(
  $mergeScript,
  '--template', $templatePath,
  '--output', $RenderedConfigPath,
  '--config', $ConfigPath
)

if ($Model) {
  $nodeArgs += @('--model', $Model)
}
if ($ApplyToMainConfig) {
  $nodeArgs += '--write-config'
}

& node @nodeArgs
if ($LASTEXITCODE -ne 0) { throw "init-nk-self.mjs exited with code $LASTEXITCODE" }

Write-Host ''
Write-Host '[next] Recommended checks:'
Write-Host "       openclaw agents list"
if ($ApplyToMainConfig) {
  Write-Host "       openclaw gateway restart"
}
Write-Host "       openclaw sessions list"
Write-Host ''
Write-Host "[done] Personal multi-agent setup finished. Rendered config: $RenderedConfigPath"
