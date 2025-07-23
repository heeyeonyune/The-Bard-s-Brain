#!/usr/bin/env python3
"""
Startup script for The Bard's Brain backend server
"""

import sys
import os
import subprocess

def main():
    print("🎭 The Bard's Brain - Backend Server")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists('backend'):
        print("❌ Error: Please run this script from the Team8GoogleAIHackathon directory")
        sys.exit(1)
    
    # Check if requirements are installed
    try:
        import fastapi
        import uvicorn
        import google.genai
        print("✅ Dependencies found")
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Please install requirements: pip install -r requirments.txt")
        sys.exit(1)
    
    # Start the backend server
    print("🚀 Starting backend server on http://localhost:8000")
    print("📖 API documentation will be available at http://localhost:8000/docs")
    print("🛑 Press Ctrl+C to stop the server")
    print("-" * 40)
    
    try:
        # Change to backend directory and run the server
        os.chdir('backend')
        subprocess.run([sys.executable, 'run.py'], check=True)
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
    except subprocess.CalledProcessError as e:
        print(f"❌ Server failed to start: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 