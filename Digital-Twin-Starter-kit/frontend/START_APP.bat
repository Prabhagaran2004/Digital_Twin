@echo off
echo.
echo ========================================
echo   Digital Twin Frontend Launcher
echo   Starting your AI Buddy! 💪🏏
echo ========================================
echo.

:: Check if node_modules exists
if not exist "node_modules\" (
    echo [1/2] Installing dependencies...
    echo.
    call npm install
    echo.
    echo ✓ Dependencies installed!
    echo.
) else (
    echo ✓ Dependencies already installed
    echo.
)

echo [2/2] Starting development server...
echo.
echo Your Digital Twin will open in your browser!
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
