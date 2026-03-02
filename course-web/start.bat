@echo off
chcp 65001 >nul 2>&1
title OpenClaw 课程网站

echo.
echo  ========================================
echo   OpenClaw 课程网站 一键启动
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

:: 构建搜索索引
echo [*] 正在构建搜索索引...
call node scripts/build-search-index.mjs
echo.

:: 启动开发服务器
echo [*] 正在启动课程网站 (默认端口 4321)...
echo [*] 启动后请访问 http://localhost:4321
echo [*] 按 Ctrl+C 可停止服务
echo.

npx astro dev

pause
