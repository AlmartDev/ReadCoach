from sqlalchemy import Column, Integer, String, ForeignKey, Text as SQLAlchemyText
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    # Relationship to the texts they save
    texts = relationship("SavedText", back_populates="owner")

class SavedText(Base):
    __tablename__ = "saved_texts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(SQLAlchemyText)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="texts")