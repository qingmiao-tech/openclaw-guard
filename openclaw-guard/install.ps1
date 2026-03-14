[CmdletBinding()]
param(
  [string]$Owner = $(if ($env:OPENCLAW_GUARD_OWNER) { $env:OPENCLAW_GUARD_OWNER } else { 'qingmiao-tech' }),
  [string]$Version = $(if ($env:OPENCLAW_GUARD_VERSION) { $env:OPENCLAW_GUARD_VERSION } else { 'latest' }),
  [int]$Port = $(if ($env:OPENCLAW_GUARD_PORT) { [int]$env:OPENCLAW_GUARD_PORT } else { 18088 }),
  [string]$ManagedPrefix = $(if ($env:OPENCLAW_GUARD_MANAGED_PREFIX) { $env:OPENCLAW_GUARD_MANAGED_PREFIX } else { '' }),
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

function Write-Info {
  param([string]$Message)
  Write-Host "[install.ps1] $Message"
}

function Invoke-Step {
  param([scriptblock]$Script, [string]$Preview)
  if ($DryRun) {
    Write-Info "[dry-run] $Preview"
    return
  }
  & $Script
}

function Get-CommandSafe {
  param([string]$Name)
  try {
    return Get-Command $Name -ErrorAction Stop
  } catch {
    return $null
  }
}

function Get-GuardPackageSpec {
  $base = "@$Owner/openclaw-guard"
  if ($Version -eq 'latest') {
    return $base
  }

  return "$base@$Version"
}

function Ensure-Node {
  if ((Get-CommandSafe 'node') -and (Get-CommandSafe 'npm')) {
    Write-Info "Detected Node.js $(node --version) and npm $(npm --version)."
    return
  }

  if (Get-CommandSafe 'winget') {
    Write-Info 'Node.js is missing. Installing with winget...'
    Invoke-Step { winget install --id OpenJS.NodeJS.LTS -e --accept-package-agreements --accept-source-agreements } 'winget install --id OpenJS.NodeJS.LTS -e --accept-package-agreements --accept-source-agreements'
    return
  }

  if (Get-CommandSafe 'choco') {
    Write-Info 'Node.js is missing. Installing with Chocolatey...'
    Invoke-Step { choco install nodejs-lts -y } 'choco install nodejs-lts -y'
    return
  }

  Write-Info 'winget / choco are unavailable. Falling back to Node.js LTS MSI...'
  if ($DryRun) {
    Write-Info '[dry-run] Invoke-WebRequest https://nodejs.org/dist/index.json -> download latest LTS x64 MSI -> msiexec /qn'
    return
  }

  $index = Invoke-RestMethod -Uri 'https://nodejs.org/dist/index.json'
  $ltsRelease = $index | Where-Object { $_.lts -and ($_.files -contains 'msi') } | Select-Object -First 1
  if (-not $ltsRelease) {
    throw 'Unable to resolve the latest Node.js LTS MSI package.'
  }

  $msiName = "node-$($ltsRelease.version)-x64.msi"
  $msiUrl = "https://nodejs.org/dist/$($ltsRelease.version)/$msiName"
  $msiPath = Join-Path $env:TEMP $msiName
  Write-Info "Downloading $msiUrl"
  Invoke-WebRequest -Uri $msiUrl -OutFile $msiPath
  Start-Process -FilePath 'msiexec.exe' -ArgumentList "/i `"$msiPath`" /qn" -Wait -NoNewWindow
}

function Add-NpmPrefixToPath {
  if (-not (Get-CommandSafe 'npm')) {
    return
  }

  $prefix = & npm config get prefix
  if (-not $prefix -or $prefix -eq 'undefined') {
    return
  }

  $binDir = $prefix.Trim()
  if (-not (($env:Path -split ';') | Where-Object { $_.Trim().ToLowerInvariant() -eq $binDir.ToLowerInvariant() })) {
    $env:Path = "$binDir;$env:Path"
  }
}

function Install-Guard {
  $packageSpec = Get-GuardPackageSpec
  Write-Info "Installing $packageSpec globally via npm..."
  Invoke-Step { npm install -g $packageSpec } "npm install -g $packageSpec"
}

function Invoke-InitMachine {
  $args = @(
    'init-machine',
    '--install-openclaw',
    '--start-web',
    '--port', $Port
  )
  if ($ManagedPrefix) {
    $args += @('--managed-prefix', $ManagedPrefix)
  }
  if ($DryRun) {
    $args += @('--dry-run', '--json')
  }

  if (Get-CommandSafe 'openclaw-guard') {
    & openclaw-guard @args
    return
  }

  $packageSpec = Get-GuardPackageSpec
  if ($DryRun) {
    Write-Info 'openclaw-guard is not on PATH yet. Showing fallback command only:'
    Write-Info "[dry-run] npx -y $packageSpec $($args -join ' ')"
    return
  }

  Write-Info 'openclaw-guard is not on PATH yet. Falling back to npx for init-machine...'
  & npx -y $packageSpec @args
}

Write-Info "GitHub owner default: $Owner"
Write-Info "Requested Guard version: $Version"
Write-Info "Target Guard Web port: $Port"
if ($ManagedPrefix) {
  Write-Info "Managed prefix override: $ManagedPrefix"
}

Ensure-Node
Add-NpmPrefixToPath
Install-Guard
Add-NpmPrefixToPath
Invoke-InitMachine
