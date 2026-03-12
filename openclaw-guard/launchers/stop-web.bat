@echo off
setlocal
set "ROOT_DIR=%~dp0.."
cd /d "%ROOT_DIR%"
node scripts\stop-web.mjs %*
if errorlevel 1 (
    echo.
    echo [ERROR] Guard Web stop script failed.
    pause
    exit /b 1
)
endlocal
