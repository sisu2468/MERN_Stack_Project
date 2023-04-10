from fastapi import APIRouter, HTTPException, Depends, status, Cookie, Request
from pydantic import BaseModel
from typing import Optional
# from enum import Enum
# from os import getenv
from typing import Optional, List
from db import db
from routers.admin import get_current_admin
# from routers.users import check_current_user, get_current_user

router = APIRouter()

#Define the model for the parking location
class Location(BaseModel):
    locid: int
    name: str
    city: str
    state: str
    country: str
    landmark: Optional[str] = None
    pin_code: int

# Define the model for the parking map
class Map(BaseModel):
    mapid: int
    location: Location
    floor: str
    parking_slots: list
    robot_ids: list = []
    operations: list = []
    map_url: str

class ManyLocationsResponse(BaseModel):
    locations: List[Location] | None

class ManyMapsResponse(BaseModel):
    maps: List[Map] | None

def get_parking_location_by_id(id: int, response_model = ManyLocationsResponse):
    pl = db.locations.find_one({"locid": id}, {"_id": 0})
    if pl:
        return Location(**pl)
    else:
        return None


def get_parking_location_by_pin(pin: int, response_model=ManyLocationsResponse):
    pl = db.locations.find_one({"pin": pin}, {"_id": 0})
    if pl:
        return Location(**pl)
    else:
        return None

def get_parking_location_id():
    pl = list(db.locations.find({}, {"locid":1, "_id": 0}))
    l=list()
    for i in pl:
        l.append(i["locid"])
    l.sort(reverse=True)
    if len(l) == 0:
        return 0
    return 1 + l[0]


def get_parking_map_by_id(id: int, response_model = ManyMapsResponse):
    map = db.maps.find_one({"mapid": id}, {"_id": 0})
    if map:
        return Map(**map)
    else:
        return None


def get_parking_map_id():
    maps = list(db.maps.find({}, {"mapid": 1, "_id": 0}))
    map_ids = [m["mapid"] for m in maps]
    map_ids.sort(reverse=True)
    if len(map_ids) == 0:
        return 0
    return 1 + map_ids[0]
    

@router.get("/locations")
def get_locations(request: Request):
    locations = list(db.locations.find({}, {"_id": 0}))
    if len(locations):
        return ManyLocationsResponse(locations = locations)
    return None


@router.get("/maps")
def get_maps(request: Request):
    maps = list(db.maps.find({}, {"_id": 0}))
    if len(maps):
        return ManyMapsResponse(maps = maps)
    return None

#Endpoint to add a new parking location
@router.post("/new-location")
def add_parking_location(location: Location, is_admin: bool = Depends(get_current_admin)):
    location.locid = get_parking_location_id()

    if get_parking_location_by_pin(location.pin_code):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Parking location already registered")
    
    existing_location = db.locations.find_one({"name": location.name,
                                               "city": location.city,
                                               "state": location.state,
                                               "country": location.country},
                                              {"_id": 0})
    if existing_location:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Exact location details already exist")
    
    if(len(str(location.pin_code)) != 6):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid Pin Code!")
    db.locations.insert_one(location.dict())
    return {"locid": location.locid}

#Endpoint to add a new parking map
@router.post("/new-map")
def add_parking_map(map: Map, is_admin: bool = Depends(get_current_admin)):
    # Check if the map URL already exists
    existing_map = db.maps.find_one({"map_url": map.map_url}, {"_id": 0})
    if existing_map:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Map URL already exists")

    existing_map = db.maps.find_one({"location": map.location.dict(), 
                                      "floor": map.floor, 
                                      "parking_slots": map.parking_slots},
                                     {"_id": 0})
    if existing_map:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Exact map details already exist")
    
    map.mapid = get_parking_map_id()
    
    db.maps.insert_one(map.dict())
    return {"mapid": map.mapid}

"""
Checked the code until here.............
"""

#Endpoint to get all parking locations
@router.get("/parking-locations")
def get_parking_locations():
    return db.parking_locations.fetch_all()

#Endpoint to get a single parking location by id
@router.get("/parking-locations/{parking_location_id}")
def get_parking_location(parking_location_id: int):
    pl = get_parking_location_by_id(parking_location_id)
    if pl:
        return Location(**pl)
    raise HTTPException(status_code=404, detail="Parking location not found")

#Endpoint to remove a parking location by id
@router.delete("/parking-locations/{parking_location_id}")
def remove_parking_location(parking_location_id: int):
    pl = get_parking_location_by_id(parking_location_id)
    if pl:
        db.parking_locations.remove({"id": parking_location_id})
        return {"message": "Parking location deleted successfully"}
    raise HTTPException(status_code=404, detail="Parking location not found")