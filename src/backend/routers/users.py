from fastapi import APIRouter, HTTPException, Depends, Response, status, Cookie, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from typing import Optional
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
# from bson.objectid import ObjectId
from os import getenv

from db import db

router = APIRouter()

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Authentication
SECRET_KEY = getenv("JWT_SECRET_KEY", "this_is_my_very_secretive_secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

print(SECRET_KEY)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

# User Model


class User(BaseModel):
    username: str
    email: EmailStr
    contact: str
    full_name: Optional[str] = None
    password: str


# User Login Model
class UserLogin(BaseModel):
    username: str
    password: str


# User Login Response Model
class UserLoginResponse(BaseModel):
    access_token: str
    token_type: str


# Hash password using bcrypt
def get_password_hash(password: str):
    return pwd_context.hash(password)


# Verify password using bcrypt
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


# Create User in MongoDB
def create_user(user: User):
    user.password = get_password_hash(user.password)
    result = db.users.insert_one(user.dict())
    return str(result.inserted_id)


# Get User from MongoDB by Username
def get_user_by_username(username: str):
    user = db.users.find_one({"username": username})
    if user:
        return User(**user)
    else:
        return None


# Get User from MongoDB by Email
def get_user_by_email(email: EmailStr):
    user = db.users.find_one({"email": email})
    if user:
        return User(**user)
    else:
        return None


# Authenticate User by Username and Password
def authenticate_user(username: str, password: str):
    user = get_user_by_username(username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


# Create Access Token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Dependency for User Authentication


async def get_current_user(request: Request, access_token: str = Cookie(None)):
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=401, detail="Invalid authentication credentials")
        user = get_user_by_username(username)
        if user is None:
            raise HTTPException(
                status_code=401, detail="Invalid authentication credentials")
        del user.password
        return user
    except JWTError:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials")

# User Registration Endpoint


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(response: Response, user: User):
    # Check if user already exists
    if get_user_by_username(user.username):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Username already registered")
    if get_user_by_email(user.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Email already registered")
    # Create User and Return Response
    user_id = create_user(user)
    # return {"user_id": user_id}

    access_token = create_access_token(data={"sub": user.username})
    response.set_cookie(key="access_token", value=access_token, httponly=True)

    return {"access_token": access_token, "token_type": "bearer"}

# User Login Endpoint


@router.post("/login", response_model=UserLoginResponse)
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid username or password")
    # Create Access Token and Set Cookie
    access_token = create_access_token(data={"sub": user.username})
    response.set_cookie(key="access_token", value=access_token, httponly=True)

    return {"access_token": access_token, "token_type": "bearer"}

# Get Current User Endpoint


@router.get("/me")
async def read_users_me(request: Request, current_user: User = Depends(get_current_user)):
    return current_user
