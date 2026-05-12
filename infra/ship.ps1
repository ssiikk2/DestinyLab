param(
  [string]$CommitMessage = "",
  [string]$Remote = "origin",
  [string]$Branch = "",
  [string]$ResourceGroup = "destinylab-rg",
  [string]$Location = "eastus",
  [string]$AcrName = "destinylab93181",
  [string]$ContainerEnvName = "destinylab-env",
  [string]$ContainerAppName = "destinylab-main",
  [string[]]$VerifyUrls = @(
    "https://lovecompatibilitycalculator.com/",
    "https://lovecompatibilitycalculator.com/calculator",
    "https://lovecompatibilitycalculator.com/sitemap.xml"
  ),
  [switch]$SkipBuild,
  [switch]$SkipLint,
  [switch]$SkipGit,
  [switch]$SkipPush,
  [switch]$SkipDeploy,
  [switch]$SkipVerify
)

$ErrorActionPreference = "Stop"

function Add-CommonToolPaths {
  $paths = @(
    "C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin",
    "C:\Program Files\nodejs"
  )

  foreach ($path in $paths) {
    if ((Test-Path $path) -and -not (($env:Path -split ";") -contains $path)) {
      $env:Path = "$path;$env:Path"
    }
  }
}

function Ensure-Command {
  param(
    [string]$Name,
    [string]$Hint
  )

  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Missing required command '$Name'. $Hint"
  }
}

function Get-CurrentBranch {
  $current = (git branch --show-current).Trim()
  if (-not $current) {
    throw "Could not resolve current git branch. Pass -Branch explicitly."
  }
  return $current
}

function Has-GitChanges {
  $status = git status --porcelain
  return [bool]$status
}

function Invoke-VerifyUrls {
  param([string[]]$Urls)

  foreach ($url in $Urls) {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
    Write-Host "Verified $url -> HTTP $($response.StatusCode), $($response.Content.Length) bytes"
  }
}

Add-CommonToolPaths
Ensure-Command -Name "git" -Hint "Install Git and make sure it is on PATH."
Ensure-Command -Name "npm" -Hint "Install Node.js LTS and restart the terminal."

if (-not $SkipDeploy) {
  Ensure-Command -Name "az" -Hint "Install Azure CLI, then run az login."
  az account show 1>$null
}

if (-not $Branch) {
  $Branch = Get-CurrentBranch
}

Write-Host "Shipping branch     : $Branch"
Write-Host "Git remote          : $Remote"

if (-not $SkipBuild) {
  npm run build
}

if (-not $SkipLint) {
  npm run lint
}

if (-not $SkipGit) {
  if (Has-GitChanges) {
    git add -A

    if (-not $CommitMessage) {
      $stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
      $CommitMessage = "ship: update site $stamp"
    }

    git commit -m $CommitMessage
  } else {
    Write-Host "No git changes to commit."
  }

  if (-not $SkipPush) {
    git push $Remote $Branch
  }
}

if (-not $SkipDeploy) {
  & "$PSScriptRoot\deploy-single.ps1" `
    -ResourceGroup $ResourceGroup `
    -Location $Location `
    -AcrName $AcrName `
    -ContainerEnvName $ContainerEnvName `
    -ContainerAppName $ContainerAppName
}

if (-not $SkipVerify) {
  Invoke-VerifyUrls -Urls $VerifyUrls
}

Write-Host "Ship complete."
