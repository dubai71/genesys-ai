# Install ngrok on Windows

# Option 1: Via Chocolatey (if you have it)
# choco install ngrok

# Option 2: Direct download (run as admin)
# Download ngrok
$ProgressPreference = 'SilentlyContinue'
Invoke-WebRequest -Uri "https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip" -OutFile "C:\ngrok.zip"

# Extract
Expand-Archive -Path "C:\ngrok.zip" -DestinationPath "C:\ngrok" -Force

# Move to PATH
Move-Item -Path "C:\ngrok\ngrok.exe" -Destination "C:\Program Files\ngrok.exe" -Force

# Clean up
Remove-Item "C:\ngrok.zip" -Force
Remove-Item "C:\ngrok" -Recurse -Force

# Add to PATH temporarily for this session
$env:Path += ";C:\"

# Verify
& "C:\Program Files\ngrok.exe" --version

Write-Host "`nTo autostart with Windows, run:"
Write-Host 'Set-Path -Value "C:\Program Files" -Location User -Prepend'
Write-Host "`nOr just use full path: C:\Program Files\ngrok.exe"