import os
from dotenv import load_dotenv
from google import genai
import logging

# env var
load_dotenv(dotenv_path='../.env', override=True)

# log
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# gem config
GOOGLE_API_KEY = "AIzaSyAtmeV2OFfLd-BpQbwOUItoOHqTtg8xzGI" #os.getenv('GOOGLE_API_KEY')
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable is required")

try:
    client = genai.Client(api_key=GOOGLE_API_KEY)
    logger.info("Gemini client initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize Gemini client: {e}")
    raise

API_HOST = os.getenv('API_HOST', '0.0.0.0')
API_PORT = int(os.getenv('API_PORT', 8000))
DEBUG = os.getenv('DEBUG', 'True').lower() == 'true' 