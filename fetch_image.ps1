$res = Invoke-WebRequest -Uri "https://www.kulturportali.gov.tr/turkiye/giresun/gezilecekyer/tirebolu-kalesi"
foreach ($image in $res.Images) {
    if ($image.src -match "\.jpg$|\.jpeg$|\.png$") {
        Write-Output $image.src
    }
}
