@echo off
REM SportHub Setup Script for Windows
REM This script installs all dependencies and sets up the development environment

echo.
echo ====================================
echo SportHub E-Commerce Setup Script
echo ====================================
echo.

REM Check if Node.js is installed
echo Checking for Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js found:
node --version

echo.
echo Installing dependencies...
echo This may take a few minutes...
echo.

REM Clear npm cache
npm cache clean --force

REM Install dependencies with retry
setlocal enabledelayedexpansion
set /a retries=0
:retry
if !retries! geq 3 (
    echo ERROR: Failed to install dependencies after 3 attempts
    pause
    exit /b 1
)

npm install
if errorlevel 1 (
    set /a retries=!retries!+1
    echo Retry attempt !retries!/3...
    timeout /t 10
    goto retry
)

echo.
echo ✓ Dependencies installed successfully!
echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Run development server: npm run dev
echo 2. Open http://localhost:3000 in your browser
echo.
pause
