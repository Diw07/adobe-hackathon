from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from pdf_processing import extract_outline
from semantic_linking import compute_links, semantic_search
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.43.35:3000"  
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process_pdf/")
async def process_pdf(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    outline = extract_outline(temp_path)
    links = compute_links(outline)

    os.remove(temp_path)
    return {"outline": outline, "links": links}

@app.post("/semantic_search/")
async def search(request: Request):
    data = await request.json()
    query = data.get("query", "")
    sections = data.get("sections", [])
    results = semantic_search(sections, query)
    return {"results": results}

@app.get("/")
def root():
    return {"message": "Backend is running."}
