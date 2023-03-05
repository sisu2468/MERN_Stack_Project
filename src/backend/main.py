from fastapi import FastAPI
from os import getenv
from routers import users

DEBUG = getenv("BACKEND_DEBUG", "False").lower() in ("true", "1", "t")

# Create a new FastAPI instance
# FastAPI App
if DEBUG :
    app = FastAPI(
        debug=DEBUG,
        title="ChargeMate",
        desciption="DASS Project 2k23 - Team-37",
    )
else:
    app = FastAPI(
        debug=DEBUG,
        title="ChargeMate",
        desciption="DASS Project 2k23 - Team-37",
        docs_url=None,
        redoc_url=None
    )

# Mount the user router on the "/auth" path
app.include_router(users.router, prefix="/auth", tags=["auth"])
