from PIL import Image
from app.services.ocr import perform_ocr
import os

def test_ocr_on_sample_image():
    path = os.path.join("tests", "samples", "aadhaar_sample.jpg")
    img = Image.open(path)
    results = perform_ocr(img)
    assert isinstance(results, list)
    assert any("text" in r for r in results)