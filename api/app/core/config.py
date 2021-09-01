import os

API_PREFIX = "/api"

# Use SQLite if no environment variable DATABASE_URL is provided
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
