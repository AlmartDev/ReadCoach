from fastapi import FastAPI
from .database import engine
from . import models

# This creates the tables in Postgres if they don't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/api/health")
def health_check():
    return {"status": "Database tables verified"}