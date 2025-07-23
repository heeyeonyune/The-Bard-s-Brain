#!/usr/bin/env python3
import uvicorn
from config import API_HOST, API_PORT, DEBUG

if __name__ == "__main__":
    print("Starting D&D World Generator API...")
    print(f"Server will be available at: http://{API_HOST}:{API_PORT}")
    print(f"API Documentation: http://{API_HOST}:{API_PORT}/docs")
    
    uvicorn.run(
        "main:app",
        host=API_HOST,
        port=API_PORT,
        reload=DEBUG
    ) 