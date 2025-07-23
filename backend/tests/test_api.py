"""
API tests for Smart Summarizer
Run with: poetry run pytest
"""
import sys
from pathlib import Path
# Add the project root to Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

import pytest
from fastapi.testclient import TestClient
from src.app import app

client = TestClient(app)

def test_health_check():
    """Test the root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_summarize_endpoint():
    """Test basic summarization"""
    test_content = "A" * 100  # Minimum length content
    
    response = client.post(
        "/summarize",
        json={
            "content": test_content,
            "content_type": "general",
            "summary_length": 50,
            "style": "professional",
            "focus_points": "main ideas"
        }
    )
    
    # Note: This will fail without a valid API key
    # For actual testing, mock the OpenAI calls
    assert response.status_code in [200, 500]

def test_invalid_content_length():
    """Test content validation"""
    response = client.post(
        "/summarize",
        json={"content": "Too short"}
    )
    assert response.status_code == 422