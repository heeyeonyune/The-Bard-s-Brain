from fastapi import APIRouter, HTTPException
from models import CharacterGenerateRequest, CharacterGenerateResponse, CharacterVisualizeRequest, CharacterVisualizeResponse, ErrorResponse
from services.character_service import generate_character_description, generate_character_image
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/character", tags=["character"])

# character gen
@router.post("/generate", response_model=CharacterGenerateResponse)
async def character_generate(request: CharacterGenerateRequest):
    try:
        logger.info(f"Generating character profile for: {request.name} in world context: {request.world_context[:50]}...")
        
        profile = generate_character_description(
            name=request.name,
            race=request.race,
            characteristics=request.characteristics,
            visual_description=request.visual_description,
            backstory=request.backstory,
            world_context=request.world_context,
            world_id=request.world_id
        )
        
        return CharacterGenerateResponse(profile=profile)
    
    except Exception as e:
        logger.error(f"Error in character generation endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# character gen with world ID (alternative endpoint for easier integration)
@router.post("/generate/{world_id}", response_model=CharacterGenerateResponse)
async def character_generate_with_world(world_id: str, request: CharacterGenerateRequest):
    try:
        logger.info(f"Generating character profile for: {request.name} in world: {world_id}")
        
        # Override the world_id from the path parameter
        request.world_id = world_id
        
        profile = generate_character_description(
            name=request.name,
            race=request.race,
            characteristics=request.characteristics,
            visual_description=request.visual_description,
            backstory=request.backstory,
            world_context=request.world_context,
            world_id=world_id
        )
        
        return CharacterGenerateResponse(profile=profile)
    
    except Exception as e:
        logger.error(f"Error in character generation endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# character visualize
@router.post("/visualize", response_model=CharacterVisualizeResponse)
async def character_visualize(request: CharacterVisualizeRequest):
    try:
        logger.info(f"Generating character visualization for prompt: {request.visual_prompt[:50]}...")
        
        image_data = generate_character_image(
            visual_prompt=request.visual_prompt
        )
        
        return CharacterVisualizeResponse(image_data=image_data)
    
    except Exception as e:
        logger.error(f"Error in character visualization endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e)) 