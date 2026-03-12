@echo off
setlocal
set "ROOT_DIR=%~dp0.."
cd /d "%ROOT_DIR%"
node scripts\restart-web.mjs %*
if errorlevel 1 (
    echo.
    echo [ERROR] Guard Web restart script failed.
    pause
    exit /b 1
)
endlocal
