@echo off
setlocal enabledelayedexpansion
for /f "delims= tokens=1" %%i in ('netstat -aon ^| findstr "127.0.0.1:8080 "') do (
set a=%%i
taskkill /f /pid "!a:~71,5!"
)
