# Fruit Ninja — Windows CLI Installer

This folder contains a PowerShell installer for the Windows 10/11 executable published in GitHub Releases.

## Install

After these files have been committed to the `main` branch of `kunalgupta016/v2Portfolio`, open PowerShell and run:

```powershell
irm https://raw.githubusercontent.com/kunalgupta016/v2Portfolio/main/games/fruit-ninja/install.ps1 | iex
```

No administrator rights are required. The installer:
- Finds the latest published stable release.
- Downloads the `FruitNinja_Hand.exe` release asset.
- Checks the downloaded SHA-256 against GitHub's release asset digest.
- Installs to `%LOCALAPPDATA%\Programs\FruitNinja`.
- Creates a `Fruit Ninja` desktop shortcut.

## Launch

```powershell
Start-Process "$env:LOCALAPPDATA\Programs\FruitNinja\FruitNinja_Hand.exe"
```

## Uninstall

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "$env:LOCALAPPDATA\Programs\FruitNinja\uninstall.ps1"
```

The uninstaller removes the installation folder and desktop shortcut.

## Publishing a new version

1. Test the Windows executable.
2. Create a published (not draft or prerelease) release in this repository.
3. Attach the file named exactly `FruitNinja_Hand.exe`.
4. Publish the release. The installer stops if GitHub does not return a SHA-256 asset digest.

The installer always uses the latest stable release, so the install command stays the same between updates.

## Security notes

- This package supports Windows 10/11 only.
- The install command executes a script from the internet. Users can inspect `install.ps1` before running it.
- An unsigned executable may trigger Microsoft Defender SmartScreen.
- Only install the executable if you trust the publisher.
