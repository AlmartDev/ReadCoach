from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Essential for connecting your React frontend to this Python backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Welcome to the ReadCoach API",
        "default_text": "The quick brown fox jumps over the lazy dog"
    }

@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy"}