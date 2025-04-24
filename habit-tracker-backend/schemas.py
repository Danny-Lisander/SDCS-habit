from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class HabitBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    color: Optional[str] = None

class HabitCreate(HabitBase):
    pass

class Habit(HabitBase):
    id: int
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True 

class HabitLogCreate(BaseModel):
    habit_id: int
    date: datetime

class HabitLog(BaseModel):
    id: int
    habit_id: int
    date: datetime
    user_id: int

    class Config:
        from_attributes = True
