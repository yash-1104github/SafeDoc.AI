import easyocr
import numpy as np
from PIL import Image
from typing import List, Dict
import re


def perform_ocr(pil_image: Image.Image) -> List[Dict]:

    reader = easyocr.Reader(['en'], gpu=True) #edit 
    image_array = np.array(pil_image)
    raw_results = reader.readtext(image_array)

    ocr_results = []
    aadhaar_buffer = []

    for bbox, text, confidence in raw_results:

        cleaned_text = text.replace("_", " ").replace("  ", " ") 
        digits_only = re.sub(r'\D', '', cleaned_text)

        print(f" OCR Text: {text}")
        print(f" Bounding Box: {bbox}")
        print(f" Digits Only: {digits_only} | Cleaned: {cleaned_text} | Confidence: {confidence:.2f}")

        if digits_only.isdigit() and len(digits_only) == 4 and len(cleaned_text.strip()) <= 5:

            aadhaar_buffer.append((digits_only, bbox, confidence)) 

            print(f"Aadhaar Segment Collected: {digits_only} (Total Collected: {len(aadhaar_buffer)})")

            if len(aadhaar_buffer) == 3:
                full_text = " ".join([blk[0] for blk in aadhaar_buffer])
                all_points = sum([blk[1] for blk in aadhaar_buffer], [])
                merged_bbox = _merge_bbox(all_points)
                avg_conf = sum([blk[2] for blk in aadhaar_buffer]) / 3
                print(f" Merged Aadhaar Candidate: {full_text} with Confidence: {avg_conf:.2f}")

                ocr_results.append({
                    'text': full_text,
                    'bbox': merged_bbox,
                    'confidence': avg_conf
                })
                aadhaar_buffer = []
            continue

        if aadhaar_buffer:
            print("Aadhaar Sequence Broken - Resetting Buffer")
            aadhaar_buffer = []

        ocr_results.append({
            'text': text,
            'bbox': bbox,
            'confidence': confidence
        })

    return ocr_results

def _merge_bbox(points: List[List[int]]) -> List[List[int]]:
    x_vals = [pt[0] for pt in points]
    y_vals = [pt[1] for pt in points]
    x0, y0, x1, y1 = min(x_vals), min(y_vals), max(x_vals), max(y_vals)
    return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]

# Top-Left     → [x0, y0]
# Top-Right    → [x1, y0]
# Bottom-Right → [x1, y1]
# Bottom-Left  → [x0, y1]

#ocr return all text that is present with their boundry boxes.