param(
  [string]$Branch = "fix/quick-wins",
  [string]$CommitMessage = "chore: quick wins — updates"
)

Set-StrictMode -Version Latest
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$gitPathCandidates = @("C:\\Program Files\\Git\\cmd\\git.exe","git")
$git = $null
foreach ($c in $gitPathCandidates) {
  if (Get-Command $c -ErrorAction SilentlyContinue) { $git = $c; break }
  if (Test-Path $c) { $git = $c; break }
}
if (-not $git) { Write-Error "git no encontrado. Instala git o añadelo al PATH."; exit 1 }

Push-Location $scriptRoot

# Ensure working tree clean? We'll commit staged changes
& $git -C . fetch origin
# Create or switch to branch
if (& $git -C . ls-remote --heads origin $Branch | Out-String | Select-String $Branch) {
  & $git -C . checkout -B $Branch "origin/$Branch"
} else {
  & $git -C . checkout -b $Branch
}

# Stage all changes
& $git -C . add -A

# Commit if there are changes
$porcelain = & $git -C . status --porcelain
if ($porcelain) {
  & $git -C . config user.name "assistant-autopush"
  & $git -C . config user.email "assistant@local"
  & $git -C . commit -m $CommitMessage
  & $git -C . push -u origin $Branch
  Write-Host "Cambios empujados a origin/$Branch"
} else {
  Write-Host "No hay cambios para commitear. Nada que subir."
}

Pop-Location
