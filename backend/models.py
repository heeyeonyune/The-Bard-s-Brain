from pydantic import BaseModel
from typing import Optional

class WorldGenerateRequest(BaseModel):
    name: str
    geography: str
    magic_systems: str
    lore: str
    other: Optional[str] = None

class WorldGenerateResponse(BaseModel):
    description: str
    world_id: str
    status: str = "success"

class WorldVisualizeRequest(BaseModel):
    visual_prompt: str

class WorldVisualizeResponse(BaseModel):
    image_data: str
    status: str = "success"

class CharacterGenerateRequest(BaseModel):
    name: str
    race: str
    characteristics: str
    visual_description: str
    backstory: str
    world_context: str
    world_id: Optional[str] = None

class CharacterGenerateResponse(BaseModel):
    profile: str
    status: str = "success"

class CharacterVisualizeRequest(BaseModel):
    visual_prompt: str
    world_context: Optional[str] = None

class CharacterVisualizeResponse(BaseModel):
    image_data: str
    status: str = "success"

class ErrorResponse(BaseModel):
    error: str
    status: str = "error" 