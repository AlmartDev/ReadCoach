from fastapi import FastAPI
from .database import engine
from . import models
import time
from sqlalchemy.exc import OperationalError

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def create_tables():
    while True:
        try:
            models.Base.metadata.create_all(bind=engine)
            print("Database connected and tables created!")
            break
        except OperationalError:
            print("Database not ready yet, retrying in 2 seconds...")
            time.sleep(2)

create_tables()

app = FastAPI()

@app.get("/api/health")
def health_check():
    return {"status": "Database tables verified"}