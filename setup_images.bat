@echo off
REM =============================================
REM  PESTIDO PEST CONTROL WEBSITE - SETUP SCRIPT
REM  Run this once to copy all service images, avatars & team photos
REM =============================================

SET "SRC=C:\Users\SHIVAM KR\Pestido_Images"
SET "NEW_TEAM=C:\Users\Public\Pestido_Update\team.jpg"
SET "DST=%~dp0"

echo Updating team.jpg with new Pestido team photo...
if exist "%NEW_TEAM%" (
    copy /Y "%NEW_TEAM%" "%DST%team.jpg"
    echo [OK] team.jpg updated!
)

if exist "%SRC%" (
    copy /Y "%SRC%\*.jpg" "%DST%"
)

echo.
echo ========================================================
echo Done! All images and certificates copied successfully.
echo Now open index.html in your browser.
echo ========================================================
pause
