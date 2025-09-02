from app.services.pii_detection import detect_pii

def test_detect_pii():
    ocr_output = [
        {'text': 'Name: RAJESH KUMAR', 'bbox': [[10,10],[100,10],[100,30],[10,30]]},
        {'text': 'Phone: 9876543210', 'bbox': [[10,40],[100,40],[100,60],[10,60]]},
        {'text': 'Email: raj@example.com', 'bbox': [[10,70],[150,70],[150,90],[10,90]]}
    ]
    pii = detect_pii(ocr_output)
    assert any(item['type'] == 'email' for item in pii)
    assert any(item['type'] == 'phone' for item in pii)
    assert any(item['type'] == 'name' for item in pii)