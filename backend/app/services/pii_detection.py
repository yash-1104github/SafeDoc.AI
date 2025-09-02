import re
from typing import List, Dict

EMAIL_REGEX = re.compile(r'\b[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}\b')
PHONE_REGEX = re.compile(r'(?:\+?91[\-\s]?|0)?[6-9]\d{9}\b')
DOB_REGEX = re.compile(r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b')
AADHAAR_REGEX = re.compile(r'\b\d{4}\s?\d{4}\s?\d{4}\b')
NAME_REGEX = re.compile(r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})\b')
ADDRESS_REGEX = re.compile(
    r'\b\d+\s+[\w\s]+(?:Street|St|Road|Rd|Lane|Ln|Ave|Block|Sector|mohalla|)\b',
    re.IGNORECASE
)

def detect_pii(ocr_results: List[Dict]) -> List[Dict]:
    pii_items = []

    for item in ocr_results:
        text = item['text']
        bbox = item['bbox']

        print(f" OCR Text: {text}")
        print(f" Bounding Box: {bbox}")


        for match in EMAIL_REGEX.finditer(text):
            print(f" Detected Email: {match.group()}")
            pii_items.append({'type': 'email', 'text': match.group(), 'bbox': bbox})


        for match in PHONE_REGEX.finditer(text):
            print(f" Detected Phone: {match.group()}")
            pii_items.append({'type': 'phone', 'text': match.group(), 'bbox': bbox})


        for match in DOB_REGEX.finditer(text):
            print(f" Detected DOB: {match.group()}")
            pii_items.append({'type': 'dob', 'text': match.group(), 'bbox': bbox})


        for match in AADHAAR_REGEX.finditer(text):
            print(f" Detected Aadhaar: {match.group()}")
            formatted = match.group().replace(" ", "")
            formatted = f"{formatted[:4]} {formatted[4:8]} {formatted[8:]}"
            pii_items.append({'type': 'aadhaar', 'text': formatted, 'bbox': bbox})


        for match in NAME_REGEX.finditer(text):
            print(f" Detected Name: {match.group()}")
            pii_items.append({'type': 'name', 'text': match.group(), 'bbox': bbox})


        for match in ADDRESS_REGEX.finditer(text):
            print(f" Detected Address: {match.group()}")
            pii_items.append({'type': 'address', 'text': match.group(), 'bbox': bbox})

    return pii_items
