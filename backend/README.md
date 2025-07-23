# D&D World Generator Backend

A FastAPI-based backend service that generates rich Dungeons & Dragons worlds and characters using Google's Gemini AI. This service provides both text generation for world/character descriptions and image generation for visual representations.

## 🏗️ Architecture Overview

The backend follows a clean, modular architecture with clear separation of concerns:

```
backend/
├── main.py              # FastAPI application entry point
├── config.py            # Configuration and environment setup
├── models.py            # Pydantic data models for API requests/responses
├── run.py               # Server startup script
├── routers/             # API route handlers
│   ├── world_router.py  # World generation endpoints
│   └── character_router.py # Character generation endpoints
└── services/            # Business logic layer
    ├── world_service.py # World generation logic
    └── character_service.py # Character generation logic
```

## 🚀 Core Features

### World Generation
- **Text Generation**: Creates detailed world descriptions including geography, magic systems, lore, and cultural elements
- **Image Generation**: Generates concept art for world landscapes and environments
- **Structured Output**: Returns JSON-formatted world data with unique world IDs

### Character Generation
- **Context-Aware Characters**: Creates characters that are deeply integrated with specific world contexts
- **Rich Profiles**: Generates detailed character backgrounds, personalities, and motivations
- **Visual Representation**: Creates character portraits and concept art
- **World Integration**: Characters reference specific world elements, factions, and locations

## 🔧 Technology Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **Google Gemini AI**: Advanced AI model for text and image generation
- **Pydantic**: Data validation and serialization
- **Uvicorn**: ASGI server for running the FastAPI application
- **Python 3.x**: Core programming language

## 📡 API Endpoints

### World Endpoints

#### `POST /api/world/generate`
Generates a detailed world description based on provided parameters.

**Request Body:**
```json
{
  "name": "World Name",
  "geography": "Description of geography",
  "magic_systems": "Description of magic systems",
  "lore": "World lore and history",
  "other": "Additional details (optional)"
}
```

**Response:**
```json
{
  "description": "Generated world description in JSON format",
  "world_id": "unique-world-identifier",
  "status": "success"
}
```

#### `POST /api/world/visualize`
Generates concept art for a world based on a visual prompt.

**Request Body:**
```json
{
  "visual_prompt": "Description of the world scene to visualize"
}
```

**Response:**
```json
{
  "image_data": "base64-encoded image data",
  "status": "success"
}
```

### Character Endpoints

#### `POST /api/character/generate`
Generates a character profile integrated with a specific world context.

**Request Body:**
```json
{
  "name": "Character Name",
  "race": "Character Race",
  "characteristics": "Character traits and characteristics",
  "visual_description": "Physical appearance description",
  "backstory": "Character background story",
  "world_context": "World description to integrate with",
  "world_id": "World identifier (optional)"
}
```

**Response:**
```json
{
  "profile": "Detailed character profile",
  "status": "success"
}
```

#### `POST /api/character/generate/{world_id}`
Alternative endpoint that accepts world_id as a path parameter.

#### `POST /api/character/visualize`
Generates character concept art.

**Request Body:**
```json
{
  "visual_prompt": "Character description for visualization",
  "world_context": "World context for style influence (optional)"
}
```

**Response:**
```json
{
  "image_data": "base64-encoded image data",
  "status": "success"
}
```

## ⚙️ Configuration

The application uses environment variables for configuration:

- `GOOGLE_API_KEY`: Google Gemini API key (required)
- `API_HOST`: Server host (default: 0.0.0.0)
- `API_PORT`: Server port (default: 8000)
- `DEBUG`: Debug mode (default: True)

## 🏃‍♂️ Running the Application

### Prerequisites
- Python 3.8+
- Google Gemini API key
- Required Python packages (see requirements.txt)

### Installation
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   ```bash
   export GOOGLE_API_KEY="your-api-key-here"
   ```

3. Run the application:
   ```bash
   python run.py
   ```

The server will start on `http://localhost:8000` with automatic API documentation available at `http://localhost:8000/docs`.

## 🔄 Request Flow

1. **Client Request**: Frontend sends structured data to API endpoints
2. **Validation**: Pydantic models validate request data
3. **Service Layer**: Business logic processes the request using Gemini AI
4. **AI Generation**: Gemini generates text descriptions or images
5. **Response**: Structured response returned to client

## 🎯 Key Design Principles

- **Separation of Concerns**: Clear separation between routing, business logic, and data models
- **Error Handling**: Comprehensive error handling with proper logging
- **Type Safety**: Full type hints and Pydantic validation
- **Modularity**: Easy to extend with new features or modify existing ones
- **AI Integration**: Seamless integration with Google's Gemini AI for both text and image generation