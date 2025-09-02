import os

def test_mask_pii_endpoint(test_client):
    path = os.path.join("tests", "samples", "aadhar.jpeg")
    with open(path, "rb") as img_file:
        response = test_client.post("/api/mask-pii", files={"image": ("aadhar.jpeg", img_file, "image/jpeg")})
    assert response.status_code == 200
    assert response.headers['content-type'] == 'image/png'