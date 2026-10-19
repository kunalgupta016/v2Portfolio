# Fruit Ninja uninstaller for Windows
$ErrorActionPreference = 'Stop'
$installDir = Join-Path $env:LOCALAPPDATA 'Programs\FruitNinja'
$shortcutPath = Join-Path ([Environment]::GetFolderPath('Desktop')) 'Fruit Ninja.lnk'

if (Test-Path -LiteralPath $shortcutPath) {
    Remove-Item -LiteralPath $shortcutPath -Force
}
if (Test-Path -LiteralPath $installDir) {
    Remove-Item -LiteralPath $installDir -Recurse -Force
}
Write-Host 'Fruit Ninja has been uninstalled.' -ForegroundColor Green
