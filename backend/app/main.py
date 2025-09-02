from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import router as api_router

app = FastAPI()

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
# then run this => pip install -r requirements.txt
# run this command => uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
