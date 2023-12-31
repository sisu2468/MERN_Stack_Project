from fastapi import APIRouter, HTTPException, Depends, Response, status, Cookie, Request, Body
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from typing import Optional
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
# from bson.objectid import ObjectId
from os import getenv

from db import db
from utils import send_email_async, send_email_background, random_generator

router = APIRouter()

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Authentication
SECRET_KEY = getenv("JWT_SECRET_KEY", "this_is_my_very_secretive_secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120

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

# Change Password Input Model
class ChangePasswordInput(BaseModel):
    current_password: str
    new_password: str

# Hash password using bcrypt
def get_password_hash(password: str):
    if len(password) < 6:
        raise HTTPException(
            status_code=400, detail="Password should be atleast 6 characters long")
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
    if access_token == None:
        raise HTTPException(status_code=401, detail="Not Authenticated")
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

# Function to check the current user is logged in or not
async def check_current_user(request: Request, access_token: str = Cookie(None)):
    if access_token == None:
        return None
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            return None
        user = get_user_by_username(username)
        if user is None:
            return None
        del user.password
        return access_token
    except JWTError:
        return None

# User Registration Endpoint
@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=UserLoginResponse)
async def register(response: Response, user: User, access_token: str = Depends(check_current_user)):
    if access_token:
        response.delete_cookie("access_token")
    # Check if user already exists
    if get_user_by_username(user.username):
        response.delete_cookie('session_cookie_key')
        headers = {"set-cookie": response.headers["set-cookie"]}
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Username already registered", headers=headers)
    if get_user_by_email(user.email):
        response.delete_cookie('session_cookie_key')
        headers = {"set-cookie": response.headers["set-cookie"]}
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Email already registered", headers=headers)
    # Create User and Return Response
    user_id = create_user(user)
    # return {"user_id": user_id}

    access_token = create_access_token(data={"sub": user.username})
    response.set_cookie(key="access_token", value=access_token, httponly=True)

    return {"access_token": access_token, "token_type": "bearer"}

# User Login Endpoint
@router.post("/login", response_model=UserLoginResponse)
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), access_token: str = Depends(check_current_user)):
    if access_token:
        response.delete_cookie("access_token")
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        response.delete_cookie('session_cookie_key')
        headers = {"set-cookie": response.headers["set-cookie"]}
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid username or password", headers=headers)
    # Create Access Token and Set Cookie
    new_access_token = create_access_token(data={"sub": user.username})
    response.set_cookie(key="access_token",
                        value=new_access_token, httponly=True)

    return {"access_token": new_access_token, "token_type": "bearer"}

# Get Current User Endpoint
@router.get("/details")
async def read_users_me(request: Request, current_user: User = Depends(get_current_user)):
    return current_user

# Get current user or not
@router.get("/current", response_model=UserLoginResponse)
async def check_user(request: Request, access_token: str = Depends(check_current_user)):
    if not access_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Unauthorized")
    return {"access_token": access_token, "token_type": "bearer"}

# User Logout
@router.post("/logout")
async def logout(request: Request, response: Response, current_user: User = Depends(get_current_user)):
    # Also tried following two comment lines
    # response.set_cookie(key="access_token", value="", max_age=1)
    # response.delete_cookie("access_token", domain="localhost")
    response.delete_cookie("access_token")
    return {"message": "Logged Out Successfully"}

# Change Password
@router.post("/change-password")
async def change_password(response: Response, passwords: ChangePasswordInput, current_user: User = Depends(get_current_user)):
    if current_user:
        response.delete_cookie("access_token")
    user = authenticate_user(current_user.username, passwords.current_password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid password")

    hashed_new_password = get_password_hash(passwords.new_password)
    result = db.users.update_one({"username": current_user.username}, {
                        "$set": {"password": hashed_new_password}})
    
    if not result.modified_count:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update password")

    # Create Access Token and Set Cookie
    new_access_token = create_access_token(data={"sub": user.username})
    response.set_cookie(key="access_token",
                        value=new_access_token, httponly=True)

    return {"message": "Password changed successfully!"}


@router.post("/forget-password")
async def forget_password(email: str = Body(..., embed=True), access_token: str = Depends(check_current_user)):
    if access_token:
        raise HTTPException(status_code=400, detail="Already Logged In!")

    user = get_user_by_email(email)

    if user == None:
        raise HTTPException(status_code=400, detail="This email doesn't exist")

    new_password = random_generator(15)

    hashed_new_password = get_password_hash(new_password)
    result = db.users.update_one({"email": email}, {
                        "$set": {"password": hashed_new_password}})
    
    if not result.modified_count:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Server Error")

    await send_email_async('Forget Password', email,
                           {
                               'title': 'Forget Password',
                               'name': user.full_name,
                               'text': """Please use the below password as your new password. 
You can change your password once you login into the app/website.""",
                               'maintext': new_password
                           })
    
    return {"message": "Sent Mail Successfully!"}
