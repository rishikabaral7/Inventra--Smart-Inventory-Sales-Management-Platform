from fastapi import Header
from sqlalchemy.orm import Session
from app.auth.jwt_handler import decode_access_token
from app.repositories.user_repository import UserRepository


def get_current_user(db:Session, authorization:str,):
    if not authorization:
        raise Exception("Authorization header missing")
    token = authorization.replace("Bearer ","")
    payload = decode_access_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise Exception("Invalid token")
    
    user = UserRepository.get_by_id(db, int(user_id),)
    
    if not user:
        raise Exception("User not found")
    
    return user
    
    
    