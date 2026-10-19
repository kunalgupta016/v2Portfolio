# Fruit Ninja installer for Windows 10/11
# Install command after this file is committed to the repository:
# irm https://raw.githubusercontent.com/kunalgupta016/v2Portfolio/main/games/fruit-ninja/install.ps1 | iex

$ErrorActionPreference = 'Stop'
$owner = 'kunalgupta016'
$repo = 'v2Portfolio'
$assetName = 'FruitNinja_Hand.exe'
$installDir = Join-Path $env:LOCALAPPDATA 'Programs\FruitNinja'
$exePath = Join-Path $installDir $assetName
$shortcutPath = Join-Path ([Environment]::GetFolderPath('Desktop')) 'Fruit Ninja.lnk'
$tempExe = Join-Path $env:TEMP ("FruitNinja_Hand_" + [guid]::NewGuid().ToString('N') + '.exe')

try {
    if ($env:OS -ne 'Windows_NT') {
        throw 'This installer supports Windows 10/11 only.'
    }

    $os = Get-CimInstance Win32_OperatingSystem
    if ([int]$os.BuildNumber -lt 10240) {
        throw 'Windows 10 or newer is required.'
    }

    Write-Host 'Finding the latest Fruit Ninja release...' -ForegroundColor Cyan
    $headers = @{ 'User-Agent' = 'FruitNinja-CLI-Installer' }
    $release = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/releases/latest" -Headers $headers
    $asset = $release.assets | Where-Object { $_.name -eq $assetName } | Select-Object -First 1

    if (-not $asset) {
        throw "The latest GitHub Release does not contain $assetName. Ask the publisher to attach it to a published release."
    }
    if (-not $asset.digest -or $asset.digest -notmatch '^sha256:([a-fA-F0-9]{64})$') {
        throw 'GitHub did not provide a SHA-256 digest for this release asset. Installation stopped for safety.'
    }
    $expectedHash = $Matches[1].ToLowerInvariant()

    Write-Host "Downloading $($release.tag_name)..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $tempExe -Headers $headers

    $actualHash = (Get-FileHash -LiteralPath $tempExe -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($actualHash -ne $expectedHash) {
        throw "SHA-256 verification failed. Expected $expectedHash; got $actualHash."
    }

    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
    Move-Item -LiteralPath $tempExe -Destination $exePath -Force

    $shell = New-Object -ComObject WScript.Shell
    $shortcut = $shell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = $exePath
    $shortcut.WorkingDirectory = $installDir
    $shortcut.Description = 'Launch Fruit Ninja'
    $shortcut.Save()

    Write-Host ''
    Write-Host "Fruit Ninja $($release.tag_name) installed successfully!" -ForegroundColor Green
    Write-Host "Location: $exePath"
    Write-Host "Desktop shortcut: $shortcutPath"
    Write-Host 'Launch: Start-Process "$env:LOCALAPPDATA\Programs\FruitNinja\FruitNinja_Hand.exe"'
    Write-Host 'Uninstall: powershell -NoProfile -ExecutionPolicy Bypass -File "$env:LOCALAPPDATA\Programs\FruitNinja\uninstall.ps1"'
}
catch {
    Write-Error $_
    throw
}
finally {
    if (Test-Path -LiteralPath $tempExe) {
        Remove-Item -LiteralPath $tempExe -Force -ErrorAction SilentlyContinue
    }
}
