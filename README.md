# Smart Content Summarizer - Full Stack Application

A professional-grade content summarization application featuring a modern web interface and robust API, built with LangChain, OpenAI, FastAPI, and Next.js. This full-stack implementation demonstrates industry-standard practices for AI-powered applications.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=flat-square&logo=fastapi)
![LangChain](https://img.shields.io/badge/LangChain-0.1.0-yellow?style=flat-square)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991?style=flat-square&logo=openai)
![Poetry](https://img.shields.io/badge/Poetry-1.7-60A5FA?style=flat-square&logo=poetry)

## 🚀 Features

### Core Functionality
- **AI-Powered Summarization**: Leverages OpenAI GPT models through LangChain for intelligent content summarization
- **Customizable Parameters**: Fine-tune summaries with adjustable length, style, and focus areas
- **Multiple Content Types**: Optimized for articles, emails, reports, technical documents, and research papers
- **Real-time Processing**: Instant summary generation with loading states and error handling

### Technical Features
- **Modern Web Interface**: Responsive design that works seamlessly on desktop, tablet, and mobile
- **RESTful API**: Well-documented API with automatic OpenAPI/Swagger documentation
- **Type Safety**: Full TypeScript implementation on frontend with Pydantic validation on backend
- **Production Ready**: CORS support, error handling, input validation, and security best practices
- **Professional UI Components**: Built with Shadcn/ui for consistent, accessible design

## 📸 Screenshots

### Web Interface
- Clean, intuitive design with real-time feedback
- Responsive layout adapting to all screen sizes
- Professional UI components with smooth interactions

### API Documentation
- Interactive Swagger UI at `/docs`
- Complete endpoint documentation
- Try-it-out functionality for testing

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **LangChain**: Framework for developing applications powered by language models
- **OpenAI API**: GPT-3.5/4 for advanced text generation
- **Poetry**: Dependency management and packaging
- **Pydantic**: Data validation using Python type annotations
- **Python 3.12**: Latest Python features and performance improvements

### Frontend
- **Next.js 14**: React framework with App Router for production
- **TypeScript**: Type-safe development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn/ui**: High-quality, customizable component library
- **React Hook Form**: Performant forms with easy validation
- **Zod**: TypeScript-first schema validation

## 📋 Prerequisites

- Python 3.10 or higher
- Node.js 18.0 or higher
- Poetry (for Python dependency management)
- OpenAI API key

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/2_Smart_Content_Summarizer_with_Frontend.git
cd 2_Smart_Content_Summarizer_with_Frontend
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
poetry install

# Set up environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install Node dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Default API URL is already configured
```

## 🚀 Running the Application

You'll need two terminal windows to run both servers:

### Terminal 1: Start Backend Server
```bash
cd backend
poetry run uvicorn src.app:app --reload

# Backend will be available at:
# - API: http://localhost:8000
# - Docs: http://localhost:8000/docs
```

### Terminal 2: Start Frontend Server
```bash
cd frontend
npm run dev

# Frontend will be available at:
# - App: http://localhost:3000
```

## 📖 Usage

### Web Interface
1. Navigate to `http://localhost:3000`
2. Enter or paste your content (minimum 50 characters)
3. Configure summarization parameters:
   - **Content Type**: general, article, email, report, technical, research
   - **Style**: professional, casual, technical, academic
   - **Length**: 20-500 words (adjustable via slider)
   - **Focus Points**: Specify what aspects to emphasize
4. Click "Generate Summary" to process
5. View results including word count and character count

### API Usage
```bash
# Example API request
curl -X POST "http://localhost:8000/summarize" \
     -H "Content-Type: application/json" \
     -d '{
       "content": "Your long text content here...",
       "content_type": "article",
       "summary_length": 100,
       "style": "professional",
       "focus_points": "main arguments and conclusions"
     }'
```

### Python Example
```python
import requests

response = requests.post(
    "http://localhost:8000/summarize",
    json={
        "content": "Your text here...",
        "content_type": "article",
        "summary_length": 100,
        "style": "professional"
    }
)

print(response.json()["summary"])
```

## 🏗️ Project Structure

```
2_Smart_Content_Summarizer_with_Frontend/
├── backend/                        # Python FastAPI backend
│   ├── src/
│   │   ├── app.py                 # FastAPI application & endpoints
│   │   └── utils/
│   │       └── llm_utils.py       # LangChain & OpenAI integration
│   ├── tests/                     # Backend tests
│   ├── pyproject.toml             # Poetry dependencies
│   ├── poetry.lock                # Locked dependencies
│   └── .env.example               # Environment template
│
├── frontend/                       # Next.js TypeScript frontend
│   ├── src/
│   │   ├── app/                   # Next.js app router
│   │   │   ├── layout.tsx         # Root layout
│   │   │   ├── page.tsx           # Home page
│   │   │   └── globals.css        # Global styles
│   │   ├── components/            # React components
│   │   │   └── SummarizerForm.tsx # Main form component
│   │   └── lib/                   # Utilities
│   │       └── api.ts             # API client
│   ├── package.json               # Node dependencies
│   └── .env.example               # Environment template
│
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
poetry run pytest
```

### Frontend Tests
```bash
cd frontend
npm run build  # Type checking
npm run lint   # Linting
```

## 🌐 API Documentation

### Endpoints

#### `GET /` - Health Check
Returns API status and welcome message.

#### `POST /summarize` - Generate Summary
Generates an AI-powered summary of the provided content.

**Request Body:**
```json
{
  "content": "string (min 50 chars)",
  "content_type": "general|article|email|report|technical|research",
  "summary_length": 20-500,
  "style": "professional|casual|technical|academic",
  "focus_points": "string"
}
```

**Response:**
```json
{
  "summary": "Generated summary text",
  "word_count": 100,
  "char_count": 542,
  "parameters_used": {
    "content_type": "article",
    "summary_length": 100,
    "style": "professional",
    "focus_points": "main ideas"
  }
}
```

## 🚀 Deployment

### Backend Deployment (Railway/Render)
1. Set environment variables in platform
2. Use `poetry install --only main` for production
3. Start command: `uvicorn src.app:app --host 0.0.0.0 --port $PORT`

### Frontend Deployment (Vercel)
1. Connect GitHub repository
2. Set `NEXT_PUBLIC_API_URL` to your backend URL
3. Deploy with one click

## 💼 Use Cases

This application is perfect for:

- **Content Agencies**: Automate article and blog post summarization
- **Email Management**: Quickly summarize long email threads
- **Research Teams**: Extract key findings from academic papers
- **Business Intelligence**: Summarize reports and market analyses
- **Educational Platforms**: Create study materials from lengthy texts
- **News Aggregation**: Generate concise news summaries

## 🔒 Security

- API keys stored in environment variables
- CORS configured for production use
- Input validation and sanitization
- Rate limiting ready (can be added)
- No sensitive data logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Muhammad Abbas Abbasi**
- GitHub: [@abbasi07-dev](https://github.com/abbasi07-dev)

## 🙏 Acknowledgments

- OpenAI for providing the GPT models
- LangChain team for the excellent framework
- Vercel for Next.js and deployment platform
- Shadcn for the beautiful UI components

---

⭐ **If you find this project useful, please consider giving it a star!**

🐛 **Found a bug?** Please open an issue with a detailed description.

💡 **Have a feature request?** Feel free to open an issue to discuss it.