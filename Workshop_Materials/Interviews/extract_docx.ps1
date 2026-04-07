Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($args[0])
$entry = $zip.Entries | Where-Object { $_.FullName -eq "word/document.xml" }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xml = $reader.ReadToEnd()
$reader.Close()
$zip.Dispose()

# Extract text specifically from <w:t> tags
$matches = [regex]::Matches($xml, '<w:t.*?>(.*?)</w:t>')
$text = ""
foreach ($match in $matches) {
    $text += $match.Groups[1].Value + " "
}

# Normalize whitespace
$text = $text -replace '\s+', ' '
Write-Output $text
