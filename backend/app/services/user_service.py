from sqlalchemy.orm import Session
from app.auth.password import hash_password
from app.models import User
from app.repositories.user_repository import UserRepository
from app.auth.jwt_handler import create_access_token
from app.auth.password import verify_password
from app.graphql.input.login_input import LoginInput


class UserService:
    @staticmethod
    def register_user(db:Session, full_name:str, email:str, password:str ):
        existing_email = UserRepository.get_by_email(db, email)
        if existing_email:
            raise Exception('Email already exists')
        
        hashed_password = hash_password(password)
        
        user = User(full_name = full_name, email=email, password=hashed_password)
        
        return UserRepository.create(db,user)
    
    @staticmethod
    def login_user(db:Session, login_input:LoginInput):
        user = UserRepository.get_by_email(db, login_input.email,)
        if not user:
            raise Exception("Invalid Email or password") 
        if not verify_password(login_input.password, user.password):
            raise Exception("Invalid email or password")
        access_token = create_access_token({"sub":str(user.id),})
        
        return {
            "access_token": access_token,
            "token_type": "Bearer",
            "user": user,
               }
        
        