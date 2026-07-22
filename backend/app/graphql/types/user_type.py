import strawberry

@strawberry.type
class UserType:
    id:int
    full_name:str
    email:str