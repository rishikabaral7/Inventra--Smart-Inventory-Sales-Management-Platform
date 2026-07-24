from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp


class DatabaseSessionMiddleware(BaseHTTPMiddleware):

    def __init__(self, app: ASGIApp):
        super().__init__(app)

    async def dispatch(self, request, call_next):
        response = await call_next(request)
        
        if hasattr(request.state, 'db') and request.state.db is not None:
            request.state.db.close()
        
        return response
