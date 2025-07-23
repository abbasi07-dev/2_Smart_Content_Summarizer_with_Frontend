"""
FastAPI application for Smart Content Summarizer
Production-ready API with proper validation and error handling
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import Optional
import os
from dotenv import load_dotenv

# Import our summarizer
from src.utils.llm_utils import SmartSummarizer

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Smart Content Summarizer API",
    description="Professional content summarization service using LangChain and OpenAI",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware for web frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize summarizer
try:
    summarizer = SmartSummarizer()
except ValueError as e:
    print(f"Failed to initialize summarizer: {e}")
    print("Please ensure OPENAI_API_KEY is set in .env file")
    exit(1)

# Request/Response models
class SummaryRequest(BaseModel):
    content: str = Field(
        ..., 
        min_length=50, 
        max_length=50000,
        description="Content to summarize (50-50000 characters)"
    )
    content_type: Optional[str] = Field(
        "general", 
        description="Content type: article, email, report, technical, research"
    )
    summary_length: Optional[int] = Field(
        100, 
        ge=20, 
        le=500, 
        description="Target summary length in words"
    )
    style: Optional[str] = Field(
        "professional", 
        description="Writing style: professional, casual, technical, academic"
    )
    focus_points: Optional[str] = Field(
        "main ideas", 
        description="Specific aspects to focus on in the summary"
    )
    
    @validator('content_type')
    def validate_content_type(cls, v):
        allowed = ["general", "article", "email", "report", "technical", "research"]
        if v not in allowed:
            raise ValueError(f"content_type must be one of: {', '.join(allowed)}")
        return v
    
    @validator('style')
    def validate_style(cls, v):
        allowed = ["professional", "casual", "technical", "academic"]
        if v not in allowed:
            raise ValueError(f"style must be one of: {', '.join(allowed)}")
        return v

class SummaryResponse(BaseModel):
    summary: str
    word_count: int
    char_count: int
    parameters_used: dict
    
class HealthResponse(BaseModel):
    status: str
    message: str

# API Endpoints
@app.get("/", response_model=HealthResponse)
async def root():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        message="Smart Summarizer API is running. Visit /docs for documentation."
    )

@app.post("/summarize", response_model=SummaryResponse)
async def create_summary(request: SummaryRequest):
    """
    Generate an intelligent summary of the provided content
    
    This endpoint uses LangChain with OpenAI to create customized summaries
    based on content type, desired length, and style preferences.
    """
    try:
        summary = summarizer.summarize(
            content=request.content,
            content_type=request.content_type,
            summary_length=request.summary_length,
            style=request.style,
            focus_points=request.focus_points
        )
        
        if summary.startswith("Error"):
            raise HTTPException(status_code=500, detail=summary)
        
        return SummaryResponse(
            summary=summary,
            word_count=len(summary.split()),
            char_count=len(summary),
            parameters_used={
                "content_type": request.content_type,
                "summary_length": request.summary_length,
                "style": request.style,
                "focus_points": request.focus_points
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
