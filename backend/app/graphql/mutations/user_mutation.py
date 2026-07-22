import strawberry
from app.graphql.input.user_input import RegisterInput
from app.graphql.types.user_type import UserType
from app.services.user_service import UserService
from strawberry.types import Info
from app.graphql.input.login_input import LoginInput
from app.graphql.types.auth_type import AuthType

@strawberry.type
class UserMutation:
    @strawberry.mutation
    def register(self,info:Info, input:RegisterInput)->UserType:
        db = info.context["db"]
        user = UserService.register_user(db=db, full_name=input.full_name, email = input.email, password=input.password)
        
        return UserType(id = user.id, full_name=user.full_name, email=user.email)
    
    @strawberry.mutation
    def login(self, info:Info, input:LoginInput)->AuthType:
        db = info.context["db"]
        result = UserService.login_user(db, input,)
        
        return AuthType(
            access_token=result["access_token"],
            token_type = result["token_type"],
            user = UserType(
                id = result["user"].id,
                full_name=result["user"].full_name,
                email = result["user"].email,
            ),
        )