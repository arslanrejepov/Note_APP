from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.note_router import router as note_router
from .db.session import Base
from .db.database import engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

app.include_router(note_router)
@app.get("/")
def root():
    return {"message": "Notes API is running"}