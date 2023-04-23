from fastapi import APIRouter, HTTPException, Depends, status, Cookie, Request
from pydantic import BaseModel
from passlib.context import CryptContext
# from enum import Enum
from typing import Optional, List
from db import db
from os import getenv
from routers.users import get_current_user, User

from db import db

router = APIRouter()

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Authentication
SECRET_KEY = getenv(
    "JWT_SECRET_KEY", "this_is_my_very_secretive_secret") + "_wallet_chargemate"
ALGORITHM = "HS256"


class Wallet(BaseModel):
    username: str
    tpin: str  # Stored in a hashed manner
    amount: float = 0


class TPINInput(BaseModel):
    tpin: str


class TPINAmtInput(BaseModel):
    tpin: str
    amount: float = 0

# Helper function to hash TPIN
def hash_tpin(tpin: str):
    return pwd_context.hash(tpin)

# Helper function to verify TPIN
def verify_tpin(tpin: str, hashed_tpin: str):
    return pwd_context.verify(tpin, hashed_tpin)

# Get Wallet from MongoDB by Username
def get_wallet_by_username(username: str):
    try:
        wallet = db.wallets.find_one({"username": username}, {"_id": 0})
        if wallet:
            return Wallet(**wallet)
        else:
            return None
    except Exception:
        return None

# Authenticate User Wallet by Username and TPIN
def authenticate_wallet(username: str, tpin: str):
    wallet = get_wallet_by_username(username)
    if not wallet:
        return False
    if not verify_tpin(tpin, wallet.tpin):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid TPIN")
    return wallet

# Helper function to check wallet amount
def check_wallet_amount(amount: float):
    if amount < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Not enough amount")
    if amount >= 10000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Amount more than permissible value")

# Helper to update the amount in wallet db
def update_wallet_amount(amount: float, username: str):
    result = db.wallets.update_one({"username": username}, {
        "$set": {"amount": amount}})

    if not result.modified_count:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update balance")

# API to create a wallet
@router.post("/new-wallet", status_code=status.HTTP_201_CREATED)
def create_wallet(request: Request, input: TPINInput, user: User = Depends(get_current_user)):
    # Hash the TPIN
    hashed_tpin = hash_tpin(input.tpin)

    # Check if username already exists in the database
    wallet = get_wallet_by_username(user.username)
    if wallet:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Wallet already exists for this username")

    # Create the wallet in the database
    new_wallet = {
        "username": user.username,
        "tpin": hashed_tpin,
        "amount": 0
    }
    result = db.wallets.insert_one(new_wallet)
    if not result.inserted_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create wallet")

    return {"message": "Wallet created successfully!"}

# API to check wallet balance
@router.get("/balance")
def get_wallet_balance(request: Request, tpin: str, user: User = Depends(get_current_user)):
    wallet = authenticate_wallet(user.username, tpin)
    if not wallet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Wallet not Found")

    # Get wallet balance from the database
    balance = wallet.amount

    return {"balance": balance}

# API to add money
@router.post("/add")
def add_wallet_money(request: Request, input: TPINAmtInput, user: User = Depends(get_current_user)):
    wallet = authenticate_wallet(user.username, input.tpin)
    if not wallet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Wallet not Found")

    new_amount = input.amount + wallet.amount
    check_wallet_amount(new_amount)

    update_wallet_amount(new_amount, user.username)

    return {"balance": new_amount}

# API to deduct amount from wallet
@router.post("/deduct")
def deduct_wallet_money(request: Request, input: TPINAmtInput, user: User = Depends(get_current_user)):
    wallet = authenticate_wallet(user.username, input.tpin)
    if not wallet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Wallet not Found")

    new_amount = wallet.amount - input.amount
    check_wallet_amount(new_amount)

    update_wallet_amount(new_amount, user.username)

    return {"balance": new_amount}

# API to delete wallet
@router.delete("/delete")
async def delete_wallet(request: Request, input: TPINInput, user: User = Depends(get_current_user)):
    wallet = authenticate_wallet(user.username, input.tpin)
    if not wallet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Wallet not Found")

    # Delete the wallet
    result = db.wallets.delete_one({"username": user.username})
    if not result.deleted_count:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Couldn't delete the wallet")

    return {"message": "Deleted Successfully"}
