# Checkout onto deploy branch

git checkout deploy

# Minify Code

$targetDir = Split-Path -Parent $PSScriptRoot

if (-not (Test-Path $targetDir)) {
  Write-Error "Target directory not found: $targetDir"
  exit 1
}

Write-Host "Minifying files in: $targetDir"

$files = @()
$files += Get-ChildItem -Path "$targetDir" -Recurse -Filter "*.js" -File
$files += Get-ChildItem -Path "$targetDir" -Recurse -Filter "*.css" -File
$files += Get-ChildItem -Path "$targetDir" -Recurse -Filter "*.html" -File

# Filter out node_modules
$files = $files | Where-Object { $_.FullName -notmatch [regex]::Escape("node_modules") }

Write-Host "Found $($files.Count) files to minify"

foreach ($file in $files) {
  $filePath = $file.FullName
  $ext = $file.Extension
  
  try {
    switch ($ext) {
      ".js"   { 
        Write-Host "Minifying JS: $filePath"
        & npx terser "$filePath" -o "$filePath" -c -m 2>&1 | Out-Null
      }
      ".css"  { 
        Write-Host "Minifying CSS: $filePath"
        & npx cleancss -o "$filePath" "$filePath" 2>&1 | Out-Null
      }
      ".html" { 
        Write-Host "Minifying HTML: $filePath"
        & npx html-minifier-terser "$filePath" --collapse-whitespace --remove-comments --minify-js true --minify-css true -o "$filePath" 2>&1 | Out-Null
      }
    }
  }
  catch {
    Write-Error "Error processing $filePath : $_"
  }
}

# Commit and Push Changes

git add -A
$timestamp = Get-Date -Format "dd.MM.yyyy HH:mm:ss"
git commit -m "Deploy at: $timestamp"
git push origin deploy --force