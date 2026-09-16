from pathlib import Path
from PIL import Image

assets = [
    (Path('/home/ubuntu/webdev-static-assets/yousef/pixel-ai-grid.jpg'), Path('/home/ubuntu/webdev-static-assets/yousef/pixel-ai-grid.webp')),
    (Path('/home/ubuntu/webdev-static-assets/yousef/pixel-circuit-orbit.jpg'), Path('/home/ubuntu/webdev-static-assets/yousef/pixel-circuit-orbit.webp')),
]
for source, target in assets:
    with Image.open(source) as image:
        image = image.convert('RGB')
        image.save(target, format='WEBP', quality=78, method=6)
    print(f'{source.name}: {source.stat().st_size} -> {target.stat().st_size}')
