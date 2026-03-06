@echo off
chcp 65001 >nul 2>&1
title OpenClaw Guard Web 绠＄悊鐣岄潰

echo.
echo  ========================================
echo   OpenClaw Guard Web 绠＄悊鐣岄潰 涓€閿惎鍔?
echo  ========================================
echo.

cd /d "%~dp0"

:: 妫€鏌?node_modules 鏄惁瀛樺湪
if not exist "node_modules" (
    echo [*] 棣栨杩愯锛屾鍦ㄥ畨瑁呬緷璧?..
    call npm install
    if errorlevel 1 (
        echo [!] 渚濊禆瀹夎澶辫触锛岃妫€鏌?Node.js 鏄惁宸插畨瑁?
        pause
        exit /b 1
    )
    echo.
)

:: 鍚姩 Web 绠＄悊鐣岄潰
echo [*] 姝ｅ湪鍚姩 Web 绠＄悊鐣岄潰 (榛樿绔彛 18088)...
echo [*] 鎸?Ctrl+C 鍙仠姝㈡湇鍔?
echo.

npx tsx src/index.ts web %*

pause

