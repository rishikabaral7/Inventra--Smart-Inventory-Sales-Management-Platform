from app.auth.dependencies import get_current_user, get_current_user_from_token


def require_roles(
    db,
    authorization: str,
    allowed_roles: list[str],
):
    user = get_current_user(
        db=db,
        authorization=authorization,
    )

    normalized_user_role = (user.role or "").upper()
    normalized_allowed = [r.upper() for r in allowed_roles]

    if normalized_user_role not in normalized_allowed:
        raise Exception("You do not have permission to perform this action.")

    return user


def require_roles_from_token(
    authorization: str,
    allowed_roles: list[str],
):
    user_info = get_current_user_from_token(authorization)
    
    normalized_user_role = (user_info.get("role") or "").upper()
    normalized_allowed = [r.upper() for r in allowed_roles]

    if normalized_user_role not in normalized_allowed:
        raise Exception("You do not have permission to perform this action.")
    
    return user_info