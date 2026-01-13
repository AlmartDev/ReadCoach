import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Vercel automatically provides POSTGRES_URL if you link the storage
# We fall back to a local string for development
DATABASE_URL = os.getenv("POSTGRES_URL", "postgresql://user:password@localhost/dbname")

# Fix for Vercel/Heroku postgres URLs which often start with 'postgres://' 
# but SQLAlchemy requires 'postgresql://'
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get the DB session in your routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()