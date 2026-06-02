const buildPreviewHtml = (htmlCode: string, cssCode: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; }
    img { max-width: 100%; height: auto; }
  </style>
  <style>${cssCode}</style>
</head>
<body>
  ${htmlCode}
</body>
</html>
`

export const openPreviewInNewTab = (htmlCode: string, cssCode: string) => {
  const previewHtml = buildPreviewHtml(htmlCode, cssCode)
  const blob = new Blob([previewHtml], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
}
