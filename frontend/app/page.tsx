import { SummarizerForm } from '@/components/SummarizerForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Smart Content Summarizer
            </h1>
            <p className="text-xl text-gray-600">
              AI-powered text summarization using LangChain and OpenAI
            </p>
          </div>
          
          <SummarizerForm />
        </div>
      </div>
    </main>
  );
}