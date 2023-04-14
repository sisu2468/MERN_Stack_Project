from fastapi import APIRouter, HTTPException, Depends, status, Cookie, Request
from pydantic import BaseModel
# from enum import Enum
from typing import Optional, List
from db import db
from routers.admin import check_current_admin

router = APIRouter()


# Define the model for the robot
class Robot(BaseModel):
    roboid: int
    roskey: str
    remarks: Optional[str]

class ManyRobotsResponse(BaseModel):
    robots: List[Robot]

def get_robo_by_id(id: int):
    rb = db.robots.find_one({"roboid": id})
    if rb:
        return Robot(**rb)
    return None

def get_robo_by_key(key: str):
    rb = db.robots.find_one({"roskey": key})
    if rb:
        return Robot(**rb)
    return None

def get_robot_id():
    robo = list(db.robots.find({}, {"roboid": 1, "_id": 0}))
    l = list()
    for i in robo:
        l.append(i["roboid"])
    l.sort(reverse=True)
    if len(l) == 0:
        return 0
    return 1 + l[0]

# Add a new robot
@router.post("/new")
def add_robot(robot: Robot, is_admin: bool = Depends(check_current_admin)):
    if not is_admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Unauthorized")
    robot.roboid = get_robot_id()
    if get_robo_by_key(robot.roskey):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Robot already registered")
    db.robots.insert_one(robot.dict())
    return {"roboid": robot.roboid}

# Endpoint to get all robots
@router.get("/all")
def get_robots(request: Request, is_admin: bool = Depends(check_current_admin)):
    if not is_admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Unauthorized")
    locations = list(db.robots.find({}, {"_id": 0}))
    if len(locations):
        return ManyRobotsResponse(locations=locations)
    return None

"""
Checked the code until here.............
"""
# Endpoint to get a single robot by id
@router.get("/robot/{robot_id}")
def get_robot(robot_id: int):
    rb = get_robo_by_id(robot_id)
    if rb:
        return Robot(**rb)
    raise HTTPException(status_code=404, detail="Robot not found")

# Endpoint to remove a robot by id
@router.delete("/robot/{robot_id}")
def remove_robot(robot_id: int):
    rb = get_robo_by_id(robot_id)
    if rb:
        db.robots.remove({"id": robot_id})
        return {"message": "Robot deleted successfully"}
    raise HTTPException(status_code=404, detail="Robot not found")
