from sqlalchemy.orm import sessionmaker, declarative_base
from .database import engine

# create a session factory
SessionLocal = sessionmaker(autocommit=False,auutoflush=False, binf=engine)

# Base class for all models
Base = declarative_base()

#Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
