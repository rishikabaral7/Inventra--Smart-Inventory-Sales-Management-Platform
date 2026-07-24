from fastapi import Request

from app.database.session import SessionLocal


async def get_context(request: Request):
    if not hasattr(request.state, 'db'):
        request.state.db = SessionLocal()
    
    return {
        "request": request,
        "db": request.state.db,
    }
