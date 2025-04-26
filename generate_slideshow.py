import os

# Dossier contenant les images
folder = 'images/slideshow'
output_file = 'slideshow.html'

# Début du HTML
html_head = """<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <title>Slideshow Auto</title>
  <link rel='stylesheet' href='slideshow.css'>
</head>
<body>
<div class='slideshow-container'>
"""

# Corps du HTML généré
html_body = ""

for filename in sorted(os.listdir(folder)):
    if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp')):
        html_body += f"  <div class='slide'><img src='{folder}/{filename}' alt=''></div>\n"

# Fin du HTML
html_foot = """
</div>
<script src='slideshow.js'></script>
</body>
</html>
"""

# Génération du fichier HTML
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(html_head + html_body + html_foot)

print(f'{output_file} généré avec succès !')
