$content = Get-Content "c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html" -Raw
$openCount = ([regex]::Matches($content, '<div')).Count
$closeCount = ([regex]::Matches($content, '</div>')).Count
Write-Host "Opening divs: $openCount"
Write-Host "Closing divs: $closeCount"
$diff = $openCount - $closeCount
Write-Host "Difference: $diff"
