@echo off
setlocal
cd /d "%~dp0"
node scripts\stop-web.mjs %*
if errorlevel 1 (
    echo.
    echo [ERROR] Guard Web stop script failed.
    pause
    exit /b 1
)
endlocal
