import os
from dotenv import load_dotenv

load_dotenv()

OCR_LANGUAGES = os.getenv("OCR_LANGUAGES", "en,hi").split(",")

MASK_STYLE = os.getenv("MASK_STYLE", "black")

MAX_FILE_SIZE_MB = int(os.getenv("MAX_FILE_SIZE_MB", 5))

ALLOWED_IMAGE_EXTENSIONS = os.getenv("ALLOWED_IMAGE_EXTENSIONS", "jpg,jpeg,png").split(",")

