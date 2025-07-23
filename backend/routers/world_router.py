from fastapi import APIRouter, HTTPException
from models import WorldGenerateRequest, WorldGenerateResponse, WorldVisualizeRequest, WorldVisualizeResponse, ErrorResponse
from services.world_service import generate_world_description, generate_world_image
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/world", tags=["world"])

# world gen
@router.post("/generate", response_model=WorldGenerateResponse)
async def world_generate(request: WorldGenerateRequest):
    try:
        logger.info(f"Generating world description for: {request.name}")
        
        description, world_id = generate_world_description(
            name=request.name,
            geography=request.geography,
            magic_systems=request.magic_systems,
            lore=request.lore,
            other=request.other
        )
        
        return WorldGenerateResponse(description=description, world_id=world_id)
    
    except Exception as e:
        logger.error(f"Error in world generation endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# world visualize
@router.post("/visualize", response_model=WorldVisualizeResponse)
async def world_visualize(request: WorldVisualizeRequest):
    try:
        logger.info(f"Generating world visualization for prompt: {request.visual_prompt[:50]}...")
        
        image_data = generate_world_image(request.visual_prompt)
        
        return WorldVisualizeResponse(image_data=image_data)
    
    except Exception as e:
        logger.error(f"Error in world visualization endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e)) 