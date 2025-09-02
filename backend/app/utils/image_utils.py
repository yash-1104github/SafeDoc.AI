import io
from PIL import Image

def read_imagefile(contents: bytes) -> Image.Image:
  
    return Image.open(io.BytesIO(contents)).convert('RGB')
