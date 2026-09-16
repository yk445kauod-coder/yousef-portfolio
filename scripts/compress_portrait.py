from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/yousef-portfolio/client/public/yousef.jpg')
optimized = Path('/home/ubuntu/yousef-portfolio/client/public/yousef-optimized.jpg')
with Image.open(source) as image:
    image = image.convert('RGB')
    image.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
    image.save(optimized, format='JPEG', quality=82, optimize=True, progressive=True)
print(f'{source.stat().st_size} -> {optimized.stat().st_size}')
