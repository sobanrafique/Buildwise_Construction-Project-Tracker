@echo off
echo Creating .env file for MongoDB Atlas connection...
echo.

if exist .env (
    echo .env file already exists!
    echo Please edit it manually or delete it first.
    pause
    exit /b
)

(
echo # MongoDB Atlas Connection String
echo # IMPORTANT: Replace ^<db_password^> with your actual MongoDB Atlas password for the 'my_team' user
echo MONGO_URI=mongodb+srv://my_team:^<db_password^>@fsd.6suemfy.mongodb.net/buildwise?retryWrites=true^&w=majority
echo.
echo # Server Port
echo PORT=5000
) > .env

echo .env file created successfully!
echo.
echo IMPORTANT: Edit the .env file and replace ^<db_password^> with your actual password!
echo.
pause

