@echo off
chcp 65001 >nul 2>&1
title OpenClaw Guard Web 管理界面

echo.
echo  ========================================
echo   OpenClaw Guard Web 管理界面 一键启动
echo  ========================================
echo.

cd /d "%~dp0"

:: 检查 node_modules 是否存在
if not exist "node_modules" (
    echo [*] 首次运行，正在安装依赖...
    call npm install
    if errorlevel 1 (
        echo [!] 依赖安装失败，请检查 Node.js 是否已安装
        pause
        exit /b 1
    )
    echo.
)

:: 启动 Web 管理界面
echo [*] 正在启动 Web 管理界面 (默认端口 8088)...
echo [*] 按 Ctrl+C 可停止服务
echo.

npx tsx src/index.ts web %*

pause
