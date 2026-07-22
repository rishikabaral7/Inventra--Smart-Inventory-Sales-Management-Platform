import strawberry

from app.graphql.types.user_type import UserType

@strawberry.type
class AuthType:
    access_token:str
    token_type:str
    user:UserType
    