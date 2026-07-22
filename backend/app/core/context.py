from app.database.session import SessionLocal
from fastapi import Request

async def get_context(request:Request):
    db = SessionLocal()
    try:
        return{
            "request": request,
            "db":db,
        }
    finally:
        db.close()