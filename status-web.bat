@echo off
setlocal
cd /d "%~dp0"
node scripts\status-web.mjs %*
if errorlevel 1 (
    echo.
    echo [ERROR] Guard Web status script failed.
    pause
    exit /b 1
)
endlocal
