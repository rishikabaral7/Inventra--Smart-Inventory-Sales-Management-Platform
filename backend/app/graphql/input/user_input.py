import strawberry

@strawberry.input
class RegisterInput:
    full_name:str
    email:str
    password:str
    