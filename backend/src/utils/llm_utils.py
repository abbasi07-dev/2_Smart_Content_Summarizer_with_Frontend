"""
Smart Summarizer using Langchain and OpenAI
Professional implementation with error handling and type safety
"""

from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough
import os
from dotenv import load_dotenv
from typing import Optional

# Load environment variables
load_dotenv()

class SmartSummarizer:
    """
    Production-ready content summarizer with customizable parameters
    """
    
    def __init__(self, model: str = "gpt-3.5-turbo", temperature: float = 0.3):
        # Validate API key exists
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY not found in environment variables")
        
        self.llm = ChatOpenAI(
            model=model,
            temperature=temperature,
            openai_api_key=api_key
        )
        
        # Professional prompt template with clear instructions
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert content summarizer. 
             Create concise, accurate summaries that preserve key information.
             Adapt your style based on the content type.
             Always maintain factual accuracy and clarity."""),
            ("user", """Content Type: {content_type}
            
            Content to summarize:
            {content}
            
            Requirements:
            - Target length: {summary_length} words
            - Writing style: {style}
            - Focus areas: {focus_points}
            
            Generate a summary that meets these exact requirements.""")
        ])
        
        # Build chain using LCEL (LangChain Expression Language)
        self.chain = (
            {
                "content": RunnablePassthrough(), 
                "content_type": RunnablePassthrough(),
                "summary_length": RunnablePassthrough(),
                "style": RunnablePassthrough(),
                "focus_points": RunnablePassthrough()
            }
            | self.prompt
            | self.llm
            | StrOutputParser()
        )
    
    def summarize(
        self, 
        content: str, 
        content_type: str = "general", 
        summary_length: int = 100, 
        style: str = "professional", 
        focus_points: str = "main ideas"
    ) -> str:
        """
        Generate intelligent summaries with customizable parameters
        
        Args:
            content: Text to summarize (min 50 characters)
            content_type: Type of content (article, email, report, etc.)
            summary_length: Target word count (20-500)
            style: Writing style (professional, casual, technical)
            focus_points: Specific aspects to emphasize
            
        Returns:
            Generated summary or error message
        """
        # Input validation
        if not content or len(content.strip()) < 50:
            return "Error: Content too short to summarize effectively (min 50 characters)"
        
        try:
            summary = self.chain.invoke({
                "content": content,
                "content_type": content_type,
                "summary_length": summary_length,
                "style": style,
                "focus_points": focus_points
            })
            return summary.strip()
        except Exception as e:
            return f"Error generating summary: {str(e)}"