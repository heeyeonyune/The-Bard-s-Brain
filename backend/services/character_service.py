import base64
import logging
from typing import Optional
from config import client
from google.genai import types

logger = logging.getLogger(__name__)

def generate_character_description(
    name: str,
    race: str,
    characteristics: str,
    visual_description: str,
    backstory: str,
    world_context: str,
    world_id: Optional[str] = None
) -> str:
    system_prompt = """You are an expert character creator for Dungeons & Dragons. 
    Create detailed, compelling character profiles that are deeply integrated with the provided world context.
    
    Your character should:
    - Feel like a natural part of the world's society and culture
    - Have connections to the world's factions, locations, or historical events
    - Reflect the world's magic systems and cultural norms
    - Have motivations and goals that make sense within the world's context
    - Include references to specific world elements in their backstory
    
    Create detailed character profiles that include:
    - Name
    - Race and Class
    - Background
    - Alignment
    - Personality traits
    - Backstory (2-3 sentences)
    - Unique quirk or defining characteristic
    - Connection to the world (faction, location, or historical event)
    
    Make characters feel alive and ready for adventure within this specific world. Write in a clear, structured format. Follow/expand upon the character details if present below."""
    
    character_prompt = f"""
    Character Details:
    - Name: {name}
    - Race: {race}
    - Characteristics: {characteristics}
    - Visual Description: {visual_description}
    - Backstory: {backstory}
    
    World Context (INTEGRATE THIS INTO THE CHARACTER):
    {world_context}
    """
    
    full_prompt = f"{system_prompt}\n\n{character_prompt}"
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt
        )
        if response.text is None:
            raise Exception("No text content in response")
        return response.text
    except Exception as e:
        logger.error(f"Error generating character description: {e}")
        raise

def generate_character_image(visual_prompt: str) -> str:
    enhanced_prompt = f"""Create a detailed D&D character portrait: {visual_prompt}

Style: Fantasy character art, detailed features, appropriate armor/gear, dramatic lighting.
Composition: Character-focused, clear facial features, showing personality.
Quality: High resolution, professional fantasy character art style."""
    
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
        logger.error(f"Error generating character image: {e}")
        raise 