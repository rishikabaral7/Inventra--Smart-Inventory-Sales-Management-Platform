import strawberry
from strawberry.types import Info

from app.graphql.input.user_input import RegisterInput
from app.graphql.input.login_input import LoginInput

from app.graphql.types.user_type import UserType
from app.graphql.types.auth_type import AuthType

from app.services.user_service import UserService


@strawberry.type
class UserMutation:

    @strawberry.mutation
    def register(
        self,
        info: Info,
        input: RegisterInput,
    ) -> UserType:

        db = info.context["db"]

        user = UserService.register_user(
            db=db,
            full_name=input.full_name,
            email=input.email,
            password=input.password,
        )

        return UserType(
            id=user.id,
            full_name=user.full_name,
            email=user.email,
            role=user.role,
        )

    @strawberry.mutation
    def create_user(
        self,
        info: Info,
        full_name: str,
        email: str,
        password: str,
        role: str = "USER",
    ) -> UserType:
        db = info.context["db"]

        user = UserService.register_user(
            db=db,
            full_name=full_name,
            email=email,
            password=password,
            role=role,
        )

        return UserType(
            id=user.id,
            full_name=user.full_name,
            email=user.email,
            role=user.role,
        )

    @strawberry.mutation
    def login(
        self,
        info: Info,
        input: LoginInput,
    ) -> AuthType:

        db = info.context["db"]

        result = UserService.login_user(
            db=db,
            login_input=input,
        )

        return AuthType(
            access_token=result["access_token"],
            token_type=result["token_type"],
            user=UserType(
                id=result["user"].id,
                full_name=result["user"].full_name,
                email=result["user"].email,
                role=result["user"].role,
            ),
        )

    @strawberry.mutation
    def update_user_role(
        self,
        info: Info,
        user_id: int,
        role: str,
    ) -> UserType:
        db = info.context["db"]
        user = UserService.update_user_role(db=db, user_id=user_id, role=role)
        return UserType(
            id=user.id,
            full_name=user.full_name,
            email=user.email,
            role=user.role,
        )