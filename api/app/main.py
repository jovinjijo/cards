from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()


@app.get("/api")
def read_root():
    return {"data": [
        {"type": "bank-draft", "title": "Bank Draft", "position": 0},
        {"type": "bill-of-lading", "title": "Bill of Lading", "position": 1},
        {"type": "invoice", "title": "Invoice", "position": 2},
        {"type": "bank-draft-2", "title": "Bank Draft 2", "position": 3},
        {"type": "bill-of-lading-2", "title": "Bill of Lading 2", "position": 4},
    ]}


app.mount("/", StaticFiles(directory="/www", html=True), name="www")
