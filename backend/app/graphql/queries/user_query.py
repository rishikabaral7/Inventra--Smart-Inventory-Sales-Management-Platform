import strawberry
from strawberry.types import Info

from app.graphql.types.user_type import UserType
from app.auth.jwt_handler import decode_access_token
from app.services.user_service import UserService


@strawberry.type
class UserQuery:

    @strawberry.field
    def me(self, info: Info) -> UserType | None:
        db = info.context["db"]
        
        request = info.context["request"]
        auth_header = request.headers.get("authorization")
        
        if not auth_header or not auth_header.startswith("Bearer "):
            return None
        
        token = auth_header.split(" ")[1]
        
        try:
            payload = decode_access_token(token)
            user_id = payload.get("sub")
            
            if not user_id:
                return None
            
            user = UserService.get_user_by_id(db, user_id)
            
            if not user:
                return None
            
            return UserType(
                id=user.id,
                full_name=user.full_name,
                email=user.email,
                role=user.role,
            )
            
        except Exception:
            return None

    @strawberry.field
    def users(self, info: Info) -> list[UserType]:
        db = info.context["db"]
        db_users = UserService.get_all_users(db)
        return [
            UserType(
                id=u.id,
                full_name=u.full_name,
                email=u.email,
                role=u.role,
            )
            for u in db_users
        ]
