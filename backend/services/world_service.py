import base64
import logging
import uuid
from typing import Optional
from config import client
from google.genai import types

logger = logging.getLogger(__name__)

def generate_world_description(name: str, geography: str, magic_systems: str, lore: str, other: Optional[str] = None) -> tuple[str, str]:
    system_prompt = """You are an expert Dungeon Master and world-builder for Dungeons & Dragons. 
    Create rich, detailed worlds that are perfect for D&D campaigns. Your descriptions should include:
    - Geography and major biomes
    - Key factions and their relationships
    - Cultural elements and societies
    - Magical influences and history
    - Central conflicts or tensions
    - Notable locations and landmarks
    
    Write in an engaging, narrative style that inspires adventure. Keep descriptions to 3-4 paragraphs. 
    Start with the world name on the first line like "Name: [World Name]", then provide the detailed description.
    Follow the information provided below if present."""
    
    # Build the prompt from the structured fields
    world_prompt = f"""World Name: {name}

Geography: {geography}

Magic Systems: {magic_systems}

Lore and History: {lore}"""

    if other:
        world_prompt += f"\n\nAdditional Details: {other}"
    
    full_prompt = f"{system_prompt}\n\nWorld Details:\n{world_prompt}"
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt
        )
        if response.text is None:
            raise Exception("No text content in response")
        
        # Generate a unique world ID
        world_id = str(uuid.uuid4())
        
        return response.text, world_id
    except Exception as e:
        logger.error(f"Error generating world description: {e}")
        raise

def generate_world_image(visual_prompt: str) -> str:
    enhanced_prompt = f"""Create a stunning D&D concept art image: {visual_prompt}
    
    Style: Epic fantasy, vibrant colors, detailed environment, suitable for D&D campaign setting.
    Composition: Wide landscape view, dramatic lighting, rich atmospheric details.
    Quality: High resolution, professional fantasy art style."""
    
    try:
        response = client.models.generate_images(
            model='imagen-4.0-generate-preview-06-06',
            prompt=enhanced_prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
            )
        )
        
        # Extract image data from the first generated image
        if response.generated_images and len(response.generated_images) > 0:
            generated_image = response.generated_images[0]
            if hasattr(generated_image, 'image') and generated_image.image:
                # Use image_bytes directly from the Google GenAI Image object
                if hasattr(generated_image.image, 'image_bytes') and generated_image.image.image_bytes:
                    base64_data = base64.b64encode(generated_image.image.image_bytes).decode('utf-8')
                    return base64_data
        
        raise Exception("No image data found in response")
    except Exception as e:
        logger.error(f"Error generating world image: {e}")
        raise 