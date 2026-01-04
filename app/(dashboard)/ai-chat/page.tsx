'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChatInterface } from '@/components/ai/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AIChatPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🤖 AI Assistant
        </h1>
        <p className="text-gray-600">
          Get instant help with vehicle recommendations, rental processes, and system insights
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">🚗 Vehicle Help</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">
              Ask about available vehicles, pricing, and recommendations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">📊 Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">
              Get insights on rentals, revenue, and customer satisfaction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">💡 Smart Cache</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">
              Responses are cached for 5 minutes for faster replies
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Chat with AI Assistant</CardTitle>
          <CardDescription>
            Powered by Google Gemini with intelligent fallback for reliability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChatInterface />
        </CardContent>
      </Card>

      {/* Feature Notice */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">
              AI-Powered Features
            </h3>
            <p className="text-sm text-blue-800">
              This assistant uses real-time system data to provide accurate recommendations and insights.
              If AI is unavailable, it automatically falls back to knowledge-based responses.
              All responses are filtered for security and privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
