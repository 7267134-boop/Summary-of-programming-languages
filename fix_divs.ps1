# Read the file
$lines = Get-Content "c:\Users\72671\Desktop\שפות תכנות\סיכום\3.html" -Encoding UTF8

# For each tab, track the div depth from the tab-content opening line
$tabStarts = @(488, 739, 949, 1115, 1288, 1473, 1628, 1931, 2053, 2178, 2343, 2541, 2655, 2849)
$tabEnds = @(738, 948, 1114, 1287, 1472, 1627, 1930, 2052, 2177, 2342, 2540, 2654, 2848, 3042)
$tabNames = @('explicit-files','explicit-concept','explicit-interp','implicit-files','implicit-concept','implicit-interp','implicit-maman','mutable-files','mutable-concept','mutable-interp','param-files','param-cbv','param-cbr','param-lazy')

for ($t = 0; $t -lt $tabStarts.Count; $t++) {
    $s = $tabStarts[$t] - 1  # 0-indexed
    $e = $tabEnds[$t] - 1
    $depth = 0
    $minDepth = 0
    $minDepthLine = $s
    
    Write-Host "`n=== $($tabNames[$t]) (lines $($tabStarts[$t])-$($tabEnds[$t])) ==="
    
    for ($i = $s; $i -le $e; $i++) {
        $line = $lines[$i]
        $opens = ([regex]::Matches($line, '<div[\s>]')).Count
        $closes = ([regex]::Matches($line, '</div>')).Count
        $depth += $opens - $closes
        
        if ($depth -lt $minDepth) {
            $minDepth = $depth
            $minDepthLine = $i + 1
        }
        
        # Print lines where depth goes negative or has net closure
        if ($depth -lt 0) {
            $trimmed = $line.Trim()
            if ($trimmed.Length -gt 80) { $trimmed = $trimmed.Substring(0, 80) + "..." }
            Write-Host "  Line $($i+1): depth=$depth  |  $trimmed"
        }
    }
    Write-Host "  Final depth: $depth (min depth: $minDepth at line $minDepthLine)"
}
