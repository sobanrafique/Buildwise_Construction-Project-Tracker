# PowerShell script to create .env file
Write-Host "Creating .env file for MongoDB Atlas connection..." -ForegroundColor Green
Write-Host ""

if (Test-Path .env) {
    Write-Host ".env file already exists!" -ForegroundColor Yellow
    Write-Host "Please edit it manually or delete it first." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit
}

$envContent = @"
# MongoDB Atlas Connection String
# IMPORTANT: Replace <db_password> with your actual MongoDB Atlas password for the 'my_team' user
MONGO_URI=mongodb+srv://my_team:<db_password>@fsd.6suemfy.mongodb.net/buildwise?retryWrites=true&w=majority

# Server Port
PORT=5000
"@

$envContent | Out-File -FilePath .env -Encoding utf8

Write-Host ".env file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: Edit the .env file and replace <db_password> with your actual password!" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit"

