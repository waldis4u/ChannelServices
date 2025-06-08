from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

app = FastAPI()

# Get the current directory path
current_dir = os.path.dirname(os.path.abspath(__file__))

# Correct paths for static and template directories
static_path = os.path.join(os.path.dirname(current_dir), "static")
templates_path = os.path.join(current_dir, "templates")

print(f"Static files path: {static_path}")
print(f"Templates path: {templates_path}")

# Mount static files
app.mount("/static", StaticFiles(directory=static_path), name="static")

# Setup templates
templates = Jinja2Templates(directory=templates_path)

# Your routes here
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

def start_server():
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting server on port {port}")  # Important for debugging
    uvicorn.run("main:app", host="0.0.0.0", port=port)

if __name__ == "__main__":
    start_server()
