@echo off
chcp 65001 >nul 2>&1
title OpenClaw Guard Web 管理界面

echo.
echo  ========================================
echo   OpenClaw Guard Web 管理界面一键启动
echo  ========================================
echo.

cd /d "%~dp0"

if not exist "node_modules" (
    echo [*] 首次运行，正在安装依赖...
    call npm install
    if errorlevel 1 (
        echo [!] 依赖安装失败，请检查 Node.js / npm 环境。
        pause
        exit /b 1
    )
    echo.
)

echo [*] 正在启动 Web 管理界面（默认端口 18088）...
echo [*] 按 Ctrl+C 可停止服务。
echo.

npm run dev -- %*

pause
