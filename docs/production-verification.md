# Production Verification Notes

Use these notes when checking deployed pages on `https://mfwtools.com`.

## PowerShell and UTF-8

Windows PowerShell can show Korean text incorrectly if `curl.exe -s` output is stored or piped without reading it as UTF-8. This can look like a site encoding issue even when the HTML is valid.

Prefer saving the response first and then reading it with UTF-8:

```powershell
curl.exe -s "https://mfwtools.com/ko/privacy/" -o privacy.html
$privacy = Get-Content ".\privacy.html" -Raw -Encoding UTF8
$privacy | Select-String -Pattern "AdSense|Analytics|Cloudflare|쿠키|localStorage"
```

Check the charset explicitly:

```powershell
$privacy | Select-String -Pattern '<meta charset="UTF-8">'
```

Use the same pattern for other pages:

```powershell
curl.exe -s "https://mfwtools.com/ko/about/" -o about.html
$about = Get-Content ".\about.html" -Raw -Encoding UTF8
$about | Select-String -Pattern "브라우저|CDN|광고|오류"

curl.exe -s "https://mfwtools.com/ko/tools/image-color-picker/" -o image-color-picker.html
$picker = Get-Content ".\image-color-picker.html" -Raw -Encoding UTF8
$picker | Select-String -Pattern "#2563EB|RGB|HSL|canonical|hreflang|robots"
```

## Ad Slot Checks

Distinguish the global AdSense script from ad slot markup.

- Global script: `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`
- Ad slot markup: `<ins class="adsbygoogle"...>`
- Visible ad label: `광고` or `Advertisement`

For review preparation, disabled ad placements should not show empty ad areas or ad labels:

```powershell
curl.exe -s "https://mfwtools.com/ko/tools/image-compressor/" -o image-compressor.html
$html = Get-Content ".\image-compressor.html" -Raw -Encoding UTF8
($html | Select-String -Pattern '>광고<').Count
($html | Select-String -Pattern 'class="adsbygoogle').Count
($html | Select-String -Pattern 'pagead2.googlesyndication.com').Count
```

The global AdSense script may be present for site verification or advertising preparation. That does not mean an empty ad slot is visible in the page body.
