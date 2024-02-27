@echo off
setlocal enabledelayedexpansion

:: 重命名 .jpg 文件
for /r %%i in (*.jpg) do (
    set "filename=%%~ni"
    set "newname=!filename!.webp"
    ren "%%i" "!newname!"
)

:: 重命名 .png 文件
for /r %%i in (*.png) do (
    set "filename=%%~ni"
    set "newname=!filename!.webp"
    ren "%%i" "!newname!"
)

echo 重命名完成。
pause
endlocal
