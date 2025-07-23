"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { SummarizerAPI, SummaryRequest, SummaryResponse } from '@/lib/api';

// Form validation schema
const formSchema = z.object({
  content: z.string().min(50, 'Content must be at least 50 characters'),
  content_type: z.string().default('general'),
  summary_length: z.number().min(20).max(500).default(100),
  style: z.string().default('professional'),
  focus_points: z.string().default('main ideas'),
});

type FormData = z.infer<typeof formSchema>;

export function SummarizerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SummaryResponse | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content_type: 'general',
      summary_length: 100,
      style: 'professional',
      focus_points: 'main ideas',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await SummarizerAPI.createSummary(data as SummaryRequest);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Content Input</CardTitle>
          <CardDescription>
            Enter the content you want to summarize
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Paste your text here (minimum 50 characters)..."
                className="min-h-[200px]"
                {...register('content')}
              />
              {errors.content && (
                <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="content_type">Content Type</Label>
                <Select
                  defaultValue="general"
                  onValueChange={(value) => setValue('content_type', value)}
                >
                  <SelectTrigger id="content_type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="style">Style</Label>
                <Select
                  defaultValue="professional"
                  onValueChange={(value) => setValue('style', value)}
                >
                  <SelectTrigger id="style">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="summary_length">
                Summary Length: {watch('summary_length', 100)} words
              </Label>
              <input
                type="range"
                id="summary_length"
                min="20"
                max="500"
                step="10"
                className="w-full"
                {...register('summary_length', { valueAsNumber: true })}
              />
            </div>

            <div>
              <Label htmlFor="focus_points">Focus Points</Label>
              <input
                type="text"
                id="focus_points"
                placeholder="What to focus on..."
                className="w-full px-3 py-2 border rounded-md"
                {...register('focus_points')}
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Summarizing...
                </>
              ) : (
                'Generate Summary'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>Summary Result</CardTitle>
          <CardDescription>
            Your AI-generated summary will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-800">{result.summary}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Word Count</p>
                  <p className="font-semibold">{result.word_count}</p>
                </div>
                <div>
                  <p className="text-gray-500">Character Count</p>
                  <p className="font-semibold">{result.char_count}</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-gray-500 mb-2">Parameters Used:</p>
                <div className="space-y-1">
                  <p>Type: <span className="font-medium">{result.parameters_used.content_type}</span></p>
                  <p>Style: <span className="font-medium">{result.parameters_used.style}</span></p>
                  <p>Length: <span className="font-medium">{result.parameters_used.summary_length} words</span></p>
                  <p>Focus: <span className="font-medium">{result.parameters_used.focus_points}</span></p>
                </div>
              </div>
            </div>
          )}

          {!error && !result && (
            <p className="text-gray-500 text-center py-8">
              Enter content and click "Generate Summary" to see results
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}