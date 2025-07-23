from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import world_router, character_router
from config import logger

# fsat api
app = FastAPI(
    title="D&D World Generator API",
    description=" ",
    version="1.0.0"
)

# cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(world_router.router)
app.include_router(character_router.router)

@app.get("/health")
async def health_check():
    """Health check endpoint for frontend connectivity testing"""
    return {"status": "healthy", "message": "Backend is running"}

@app.on_event("startup")
async def startup_event():
    logger.info("starting up")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("shutting down")

if __name__ == "__main__":
    import uvicorn
    from config import API_HOST, API_PORT, DEBUG
    
    uvicorn.run(
        "main:app",
        host=API_HOST,
        port=API_PORT,
        reload=DEBUG
    ) 