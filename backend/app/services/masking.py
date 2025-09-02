from PIL import Image, ImageDraw, ImageFilter
from typing import List, Dict


def mask_image(pil_image: Image.Image, pii_items: List[Dict]) -> Image.Image:
  
    masked = pil_image.copy()

    draw = ImageDraw.Draw(masked)

    for item in pii_items:
       
        bbox = item['bbox']    # e.g., [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]

        x_coords = [pt[0] for pt in bbox]
        y_coords = [pt[1] for pt in bbox]

        x0, y0 = min(x_coords), min(y_coords)
        x1, y1 = max(x_coords), max(y_coords)

        draw.rectangle([x0, y0, x1, y1], fill="black")

    return masked