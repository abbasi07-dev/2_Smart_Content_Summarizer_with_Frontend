// API configuration and types
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types matching your backend Pydantic models
export interface SummaryRequest {
  content: string;
  content_type?: string;
  summary_length?: number;
  style?: string;
  focus_points?: string;
}

export interface SummaryResponse {
  summary: string;
  word_count: number;
  char_count: number;
  parameters_used: {
    content_type: string;
    summary_length: number;
    style: string;
    focus_points: string;
  };
}

export interface HealthResponse {
  status: string;
  message: string;
}

// API client class
export class SummarizerAPI {
  // Health check
  static async checkHealth(): Promise<HealthResponse> {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) {
      throw new Error('API is not responding');
    }
    return response.json();
  }

  // Create summary
  static async createSummary(data: SummaryRequest): Promise<SummaryResponse> {
    const response = await fetch(`${API_URL}/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create summary');
    }

    return response.json();
  }
}