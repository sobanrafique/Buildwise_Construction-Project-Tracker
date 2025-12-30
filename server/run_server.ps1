$log = 'server_run.log'
if (Test-Path $log) { Remove-Item $log }
$proc = Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'server.js' -RedirectStandardOutput $log -NoNewWindow -PassThru
Start-Sleep 6
Stop-Process -Id $proc.Id
Get-Content $log
