from sqlalchemy import Column,Integer,String,Text, DateTime
from sqlalchemy.sql import func
from ..db.session import Base

class Note(Base):
    __tablename__="notes"

    id = Column(Integer,primary_key=True,index=True)
    title=Column(String(255),nullable=False)
    content=Column(Text,nullable=True)
    created_at=Column(DateTime(timezone=True),server_default=func.now())