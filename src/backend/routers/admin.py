from fastapi import APIRouter, HTTPException, Depends, Response, status, Cookie, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from typing import Optional
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from enum import Enum
# from bson.objectid import ObjectId
from os import getenv

from db import db

router = APIRouter()

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Authentication
SECRET_KEY = getenv("JWT_SECRET_KEY", "this_is_my_very_secretive_secret") + "_admin"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


class Role(str, Enum):
    ADMIN = 'ADMIN'
    OPERATIONS = 'OPERATIONS'

# Role = Enum("Role", ["ADMIN", "OPERATIONS"])

# Admin Model
class Admin(BaseModel):
    username: str
    email: EmailStr
    role: Role = Role.OPERATIONS
    contact: str
    full_name: Optional[str] = None
    password: str


# Admin Login Model
class AdminLogin(BaseModel):
    username: str
    password: str


# Admin Login Response Model
class AdminLoginResponse(BaseModel):
    access_token: str
    role: Role
    token_type: str


# Hash password using bcrypt
def get_password_hash(password: str):
    return pwd_context.hash(password)


# Verify password using bcrypt
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


# Create Admin in MongoDB
def create_admin(admin: Admin):
    admin.password = get_password_hash(admin.password)
    result = db.admins.insert_one(admin.dict())
    return str(result.inserted_id)


# Get Admin from MongoDB by Username
def get_admin_by_username(username: str):
    admin = db.admins.find_one({"username": username})
    if admin:
        return Admin(**admin)
    else:
        return None


# Get Admin from MongoDB by Email
def get_admin_by_email(email: EmailStr):
    admin = db.admins.find_one({"email": email})
    if admin:
        return Admin(**admin)
    else:
        return None


# Authenticate Admin by Username and Password
def authenticate_admin(username: str, password: str):
    admin = get_admin_by_username(username)
    if not admin:
        return False
    if not verify_password(password, admin.password):
        return False
    return admin


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

# Dependency for Admin Authentication


async def get_current_admin(request: Request, access_token: str = Cookie(None)):
    if access_token == None:
        raise HTTPException(status_code=401, detail="Not Authenticated")
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=401, detail="Invalid authentication credentials")
        admin = get_admin_by_username(username)
        if admin is None:
            raise HTTPException(
                status_code=401, detail="Invalid authentication credentials")
        del admin.password
        return admin
    except JWTError:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials")
    

async def check_current_admin(request: Request, access_token: str = Cookie(None)):
    if access_token == None:
        return False
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            return False
        admin = get_admin_by_username(username)
        if admin is None:
            return False
        del admin.password
        return True
    except JWTError:
        return False

# Admin Registration Endpoint


@router.post("/new", status_code=status.HTTP_201_CREATED, response_model=AdminLoginResponse)
async def register(response: Response, admin: Admin):
    # Check if admin already exists
    if get_admin_by_username(admin.username):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Username already registered")
    if get_admin_by_email(admin.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Email already registered")
    # Create Admin and Return Response
    admin_id = create_admin(admin)
    # return {"admin_id": admin_id}

    access_token = create_access_token(data={"sub": admin.username})
    response.set_cookie(key="access_token", value=access_token, httponly=True)

    return {"access_token": access_token, "token_type": "bearer", "role": admin.role}

# Admin Login Endpoint


@router.post("/login", response_model=AdminLoginResponse)
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    admin = authenticate_admin(form_data.username, form_data.password)
    if not admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid username or password")
    # Create Access Token and Set Cookie
    access_token = create_access_token(data={"sub": admin.username})
    response.set_cookie(key="access_token", value=access_token, httponly=True)

    return {"access_token": access_token, "token_type": "bearer", "role": admin.role}


@router.get("/logout")
async def logout(request: Request, response: Response, current_admin: Admin = Depends(get_current_admin)):
    # Also tried following two comment lines
    # response.set_cookie(key="access_token", value="", max_age=1)
    # response.delete_cookie("access_token", domain="localhost")
    response.delete_cookie("access_token")
    return {"message": "Logged Out Successfully"}

# Get Current Admin Endpoint
@router.get("/account")
async def read_admins_account_details(request: Request, current_admin: Admin = Depends(get_current_admin)):
    return current_admin
