param(
  [string]$ResourceGroup = "destinylab-rg",
  [string]$Location = "eastus",
  [string]$AcrName = "",
  [string]$ContainerEnvName = "destinylab-env",
  [string]$ContainerAppName = "destinylab-main",
  [string]$ImageRepository = "destinylab",
  [string]$ImageTag = "",
  [int]$MinReplicas = 1,
  [int]$MaxReplicas = 5,
  [string]$Cpu = "0.5",
  [string]$Memory = "1.0Gi",
  [int]$KeepImageTags = 8,
  [switch]$PruneOldImages = $true
)

$ErrorActionPreference = "Stop"

function Ensure-AzureContainerAppExtension {
  $containerExt = az extension show --name containerapp 2>$null
  if (-not $containerExt) {
    az extension add --name containerapp --upgrade 1>$null
  } else {
    az extension update --name containerapp 1>$null
  }
}

function Resolve-AcrName {
  param(
    [string]$RequestedAcrName
  )

  if ($RequestedAcrName) {
    return $RequestedAcrName
  }

  $registryServer = ""
  try {
    $registryServer = az containerapp show `
      --name $ContainerAppName `
      --resource-group $ResourceGroup `
      --query "properties.configuration.registries[0].server" `
      -o tsv 2>$null
  } catch {
    $registryServer = ""
  }

  if ($registryServer) {
    return ($registryServer -split "\.")[0]
  }

  $existingAcrs = @()
  try {
    $acrListJson = az acr list --resource-group $ResourceGroup --query "[].name" -o json
    if ($acrListJson) {
      $existingAcrs = $acrListJson | ConvertFrom-Json
    }
  } catch {
    $existingAcrs = @()
  }

  if ($existingAcrs.Count -eq 1) {
    return $existingAcrs[0]
  }

  throw "Could not resolve a single existing ACR automatically. Pass -AcrName explicitly."
}

function Ensure-ResourceGroup {
  $rgExists = az group exists --name $ResourceGroup
  if ($rgExists -ne "true") {
    az group create --name $ResourceGroup --location $Location 1>$null
  }
}

function Ensure-AcrExists {
  param(
    [string]$ResolvedAcrName
  )

  $acr = $null
  try {
    $acr = az acr show --name $ResolvedAcrName --resource-group $ResourceGroup -o json 2>$null
  } catch {
    $acr = $null
  }

  if (-not $acr) {
    throw "ACR '$ResolvedAcrName' does not exist in '$ResourceGroup'. This script is set to reuse existing ACR only."
  }
}

function Ensure-ContainerEnv {
  $workspaceName = "$ContainerEnvName-law"
  $workspace = $null
  try {
    $workspace = az monitor log-analytics workspace show `
      --resource-group $ResourceGroup `
      --workspace-name $workspaceName `
      -o json 2>$null
  } catch {
    $workspace = $null
  }

  if (-not $workspace) {
    az monitor log-analytics workspace create `
      --resource-group $ResourceGroup `
      --workspace-name $workspaceName `
      --location $Location 1>$null
  }

  $workspaceId = az monitor log-analytics workspace show `
    --resource-group $ResourceGroup `
    --workspace-name $workspaceName `
    --query customerId -o tsv

  $workspaceKey = az monitor log-analytics workspace get-shared-keys `
    --resource-group $ResourceGroup `
    --workspace-name $workspaceName `
    --query primarySharedKey -o tsv

  $envExists = $null
  try {
    $envExists = az containerapp env show `
      --name $ContainerEnvName `
      --resource-group $ResourceGroup `
      --only-show-errors -o json 2>$null
  } catch {
    $envExists = $null
  }

  if (-not $envExists) {
    az containerapp env create `
      --name $ContainerEnvName `
      --resource-group $ResourceGroup `
      --location $Location `
      --logs-workspace-id $workspaceId `
      --logs-workspace-key $workspaceKey `
      --only-show-errors 1>$null
  }
}

function Ensure-ContainerAppIdentityAndAcrPull {
  param(
    [string]$ResolvedAcrName
  )

  az containerapp identity assign `
    --name $ContainerAppName `
    --resource-group $ResourceGroup `
    --system-assigned 1>$null

  $appPrincipalId = ""
  for ($i = 0; $i -lt 10; $i++) {
    $appPrincipalId = az containerapp show `
      --name $ContainerAppName `
      --resource-group $ResourceGroup `
      --query identity.principalId -o tsv
    if ($appPrincipalId) {
      break
    }
    Start-Sleep -Seconds 3
  }

  if (-not $appPrincipalId) {
    throw "Could not resolve Container App system identity principalId."
  }

  $acrId = az acr show --name $ResolvedAcrName --resource-group $ResourceGroup --query id -o tsv
  $roleCount = az role assignment list `
    --assignee-object-id $appPrincipalId `
    --scope $acrId `
    --query "[?roleDefinitionName=='AcrPull'] | length(@)" -o tsv
  if ($roleCount -eq "0") {
    az role assignment create `
      --assignee-object-id $appPrincipalId `
      --assignee-principal-type ServicePrincipal `
      --role AcrPull `
      --scope $acrId 1>$null
  }
}

function Prune-OldAcrImages {
  param(
    [string]$ResolvedAcrName,
    [string]$Repository,
    [string]$CurrentTag
  )

  if (-not $PruneOldImages -or $KeepImageTags -lt 1) {
    return
  }

  $tagsRaw = az acr repository show-tags `
    --name $ResolvedAcrName `
    --repository $Repository `
    --orderby time_desc `
    -o tsv

  if (-not $tagsRaw) {
    return
  }

  $allTags = @($tagsRaw -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ })

  if ($allTags.Count -le $KeepImageTags) {
    return
  }

  $tagsToDelete = @()
  for ($i = $KeepImageTags; $i -lt $allTags.Count; $i++) {
    if ($allTags[$i] -ne $CurrentTag) {
      $tagsToDelete += $allTags[$i]
    }
  }

  foreach ($tag in $tagsToDelete) {
    az acr repository delete `
      --name $ResolvedAcrName `
      --image "$Repository`:$tag" `
      --yes 1>$null
    Write-Host "Deleted old image tag: $Repository`:$tag"
  }
}

az account show 1>$null
Ensure-AzureContainerAppExtension
Ensure-ResourceGroup

$resolvedAcrName = Resolve-AcrName -RequestedAcrName $AcrName
Ensure-AcrExists -ResolvedAcrName $resolvedAcrName

if (-not $ImageTag) {
  $ImageTag = Get-Date -Format "yyyyMMdd-HHmmss"
}

$imageName = "$ImageRepository`:$ImageTag"
Write-Host "Using ACR name      : $resolvedAcrName"
Write-Host "Using image         : $imageName"

Ensure-ContainerEnv

az acr build --registry $resolvedAcrName --image $imageName --no-logs .

$acrLoginServer = az acr show --name $resolvedAcrName --resource-group $ResourceGroup --query loginServer -o tsv
$fullImage = "$acrLoginServer/$imageName"

$app = $null
try {
  $app = az containerapp show --name $ContainerAppName --resource-group $ResourceGroup --only-show-errors -o json 2>$null
} catch {
  $app = $null
}

if (-not $app) {
  az containerapp create `
    --name $ContainerAppName `
    --resource-group $ResourceGroup `
    --environment $ContainerEnvName `
    --image $fullImage `
    --ingress external `
    --target-port 3000 `
    --cpu $Cpu `
    --memory $Memory `
    --min-replicas $MinReplicas `
    --max-replicas $MaxReplicas `
    --system-assigned `
    --registry-server $acrLoginServer `
    --registry-identity system `
    --env-vars NODE_ENV=production PORT=3000 1>$null
} else {
  az containerapp registry set `
    --name $ContainerAppName `
    --resource-group $ResourceGroup `
    --server $acrLoginServer `
    --identity system 1>$null

  az containerapp update `
    --name $ContainerAppName `
    --resource-group $ResourceGroup `
    --image $fullImage `
    --cpu $Cpu `
    --memory $Memory `
    --min-replicas $MinReplicas `
    --max-replicas $MaxReplicas `
    --set-env-vars NODE_ENV=production PORT=3000 1>$null
}

Ensure-ContainerAppIdentityAndAcrPull -ResolvedAcrName $resolvedAcrName
Prune-OldAcrImages -ResolvedAcrName $resolvedAcrName -Repository $ImageRepository -CurrentTag $ImageTag

$appInfo = az containerapp show --name $ContainerAppName --resource-group $ResourceGroup --query "{name:name,fqdn:properties.configuration.ingress.fqdn,latestRevision:properties.latestRevisionName,image:properties.template.containers[0].image}" -o json | ConvertFrom-Json

Write-Host ""
Write-Host "App name           : $($appInfo.name)"
Write-Host "FQDN               : $($appInfo.fqdn)"
Write-Host "Revision           : $($appInfo.latestRevision)"
Write-Host "Active image       : $($appInfo.image)"
