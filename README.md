# Adobe Hackathon PDF Semantic Linking Project

## Project Overview

This project extracts hierarchical outlines (sections and sub-sections) from PDF documents and computes semantic links between related sections using modern NLP embeddings. It includes:

- A **FastAPI backend** to process PDFs and compute semantic similarity.
- A **React frontend** to upload PDFs, display outlines, related sections, and perform semantic search.
- Support for local and LAN network usage with proper CORS configuration.
- Sample input/output for demonstration and testing.

---

## Project Structure

adobe-hackathon/
├── backend
│   ├── app.py
│   ├── pdf_processing.pyf
│   ├── semantic_linking.py
│   ├── requirements.txt
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── test_pdfs/
│   └── sample.pdf # Sample input PDF for testing
├── sample.json # Sample backend JSON output corresponding to sample.pdf
├── README.md # This documentation file
├── Dockerfile # Optional: containerization for backend
└── .gitignore # Files/folders to ignore in git



---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js LTS and npm
- (Optional) Docker for containerized deployment

### Backend Setup

1. Open a terminal and navigate to the backend directory:

cd adobe-hackathon/backend



2. (Optional) Create and activate a Python virtual environment:

- On Windows:

  ```
  python -m venv venv
  .\venv\Scripts\activate
  ```

- On macOS/Linux:

  ```
  python3 -m venv venv
  source venv/bin/activate
  ```

3. Install the backend dependencies:

pip install -r requirements.txt



4. Run the FastAPI backend server:

uvicorn app:app --reload --host 0.0.0.0 --port 8000



5. Verify the backend is running by visiting in your browser:

http://127.0.0.1:8000/



You should see:

{"message": "Backend is running."}



---

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:

cd ../frontend



2. Install frontend dependencies:

npm install



3. Start the React development server:

npm start



4. Open your browser and go to:

http://localhost:3000



---

## Usage

- Upload a PDF via the frontend UI.
- The backend extracts the document outline and computes semantic links.
- The frontend displays the outline sidebar.
- Clicking an outline section reveals related sections by semantic similarity.
- Use the search bar for semantic queries to find relevant sections.

---

## Sample Files

- `sample.pdf` — A sample PDF document for testing.
- `sample.json` — Backend output JSON for the sample PDF.

---

## Docker (Optional)

To run the backend in a Docker container:

1. Build the Docker image (from project root):

docker build -t adobe-hackathon .



2. Run the Docker container (exposes port 8000):

docker run -p 8000:8000 adobe-hackathon




---

## Acknowledgments

Powered by:

- FastAPI  
- React  
- PyPDF2  
- SentenceTransformers  
- Scikit-learn  

Inspired by the Adobe India Hackathon 2025 Challenge.

---