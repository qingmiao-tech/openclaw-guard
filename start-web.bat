@echo off
setlocal
cd /d "%~dp0"
node scripts\restart-web.mjs %*
if errorlevel 1 (
    echo.
    echo [ERROR] Guard Web restart script failed.
    pause
    exit /b 1
)
endlocal
