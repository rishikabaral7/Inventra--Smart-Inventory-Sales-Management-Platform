from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from strawberry.fastapi import GraphQLRouter

from app.core.context import get_context
from app.graphql.schema import schema
from app.middleware.database import DatabaseSessionMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.add_middleware(DatabaseSessionMiddleware)


graphql_app = GraphQLRouter(
    schema,
    context_getter=get_context,
)


app.include_router(
    graphql_app,
    prefix="/graphql",
)