import uvicorn
import os
import sys

# Ensure backend root directory is in python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.main import app

if __name__ == "__main__":
    print("Starting RESAVO FastAPI Backend Server on http://localhost:8000 ...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
