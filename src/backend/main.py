from fastapi import FastAPI, Request
from os import getenv
from routers import users, admin

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

DEBUG = getenv("BACKEND_DEBUG", "False").lower() in ("true", "1", "t")

# Create a new FastAPI instance
# FastAPI App
if DEBUG:
    app = FastAPI(
        debug=DEBUG,
        title="ChargeMate D7",
        description="DASS Project 2k23 - Team-37",
        root_path="/api"
    )
else:
    app = FastAPI(
        debug=DEBUG,
        title="ChargeMate D7",
        description="DASS Project 2k23 - Team-37",
        docs_url=None,
        redoc_url=None,
        root_path="/api"
    )


@app.get("/")
async def index():
    return {"message": "Backend Running!!"}


@app.get("/root")
async def root(request: Request):
    return {"message": "Backend Running!!", "root_path": request.scope.get("root_path")}

# DDOS Protection + Rate Limiting
limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])
# limiter.shared_limit(limit_value="5/minute", scope="login")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# Mount the user router on the "/auth" path
app.include_router(users.router, prefix="/auth", tags=["auth"])
app.include_router(admin.router, prefix="/admin/auth", tags=["admin/auth"])
