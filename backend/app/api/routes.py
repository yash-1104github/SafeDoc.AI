from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from ..services.ocr import perform_ocr
from ..services.pii_detection import detect_pii
from ..services.masking import mask_image
from ..utils.image_utils import read_imagefile
import io

router = APIRouter()

@router.post("/mask-pii")
async def mask_pii_image(image: UploadFile = File(...)):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid image file")

    print(f"📥 Received file: {image.filename}")  # ← fixed (4 spaces only)

    contents = await image.read()
    img = read_imagefile(contents)

    ocr_results = perform_ocr(img)
    pii_items = detect_pii(ocr_results)
    masked = mask_image(img, pii_items)

    buf = io.BytesIO()
    masked.save(buf, format="PNG")
    buf.seek(0)

    return StreamingResponse(buf, media_type="image/png")