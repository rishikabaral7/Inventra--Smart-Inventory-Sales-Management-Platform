from sqlalchemy.orm import Session
from app.auth.password import hash_password
from app.models import User
from app.repositories.user_repository import UserRepository
from app.auth.jwt_handler import create_access_token
from app.auth.password import verify_password
from app.graphql.input.login_input import LoginInput

ALLOWED_ROLES = ["OWNER", "ADMIN", "MANAGER", "INVENTORY_MANAGER", "SALESPERSON"]

class UserService:
    @staticmethod
    def register_user(db: Session, full_name: str, email: str, password: str, role: str = "SALESPERSON"):
        existing_email = UserRepository.get_by_email(db, email)
        if existing_email:
            raise Exception('Email already exists')
        
        hashed_password = hash_password(password)
        role_upper = role.upper() if role else "SALESPERSON"
        if role_upper not in ALLOWED_ROLES:
            role_upper = "SALESPERSON"
            
        user = User(full_name=full_name, email=email, password=hashed_password, role=role_upper)
        return UserRepository.create(db, user)
    
    @staticmethod
    def login_user(db: Session, login_input: LoginInput):
        user = UserRepository.get_by_email(db, login_input.email)
        if not user:
            raise Exception("Invalid email or password") 
        if not verify_password(login_input.password, user.password):
            raise Exception("Invalid email or password")
        access_token = create_access_token({
            "sub": str(user.id),
            "role": user.role,
        })
        
        return {
            "access_token": access_token,
            "token_type": "Bearer",
            "user": user,
        }
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: int):
        return UserRepository.get_by_id(db, user_id)

    @staticmethod
    def get_all_users(db: Session):
        return UserRepository.get_all(db)

    @staticmethod
    def update_user_role(db: Session, user_id: int, role: str):
        role_upper = role.upper()
        if role_upper not in ALLOWED_ROLES:
            raise Exception(f"Invalid role. Allowed roles are: {', '.join(ALLOWED_ROLES)}")
        user = UserRepository.update_role(db, user_id, role_upper)
        if not user:
            raise Exception("User not found")
        return user