#!/usr/bin/env python3
"""
Startup script for The Bard's Brain frontend server
"""

import sys
import os
import subprocess
import webbrowser
import time
from http.server import HTTPServer, SimpleHTTPRequestHandler
import threading

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    print("🎭 The Bard's Brain - Frontend Server")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists('frontend'):
        print("❌ Error: Please run this script from the Team8GoogleAIHackathon directory")
        sys.exit(1)
    
    # Check if frontend/index.html exists
    if not os.path.exists('frontend/index.html'):
        print("❌ Error: frontend/index.html not found")
        sys.exit(1)
    
    # Change to frontend directory
    os.chdir('frontend')
    
    # Start HTTP server
    port = 8080
    server_address = ('', port)
    httpd = HTTPServer(server_address, CORSRequestHandler)
    
    print(f"🚀 Starting frontend server on http://localhost:{port}")
    print("🌐 Opening browser automatically...")
    print("🛑 Press Ctrl+C to stop the server")
    print("-" * 40)
    
    # Open browser in a separate thread
    def open_browser():
        time.sleep(1)  # Give server time to start
        webbrowser.open(f'http://localhost:{port}')
    
    browser_thread = threading.Thread(target=open_browser)
    browser_thread.daemon = True
    browser_thread.start()
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Frontend server stopped")
        httpd.shutdown()

if __name__ == "__main__":
    main() 