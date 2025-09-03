import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router as api_router

logging.basicConfig(level=logging.INFO)

app = FastAPI()

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logging.info(f"➡️ Incoming request: {request.method} {request.url}")
    try:
        response = await call_next(request)
    except Exception as e:
        logging.error(f"💥 Error while processing: {e}")
        raise
    logging.info(f"⬅️ Response status: {response.status_code}")
    return response

app.add_middleware(CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", summary="Root endpoint")
async def root():
    return {"message": "Service is running"}


app.include_router(api_router, prefix="/api")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)


# to run backend active .venv => source .venv/bin/activate
# then run this => python3 -m  pip install -r requirements.txt
# run this command => python3 -m  uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
