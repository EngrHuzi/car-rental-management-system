import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API client
const apiKey = process.env.GEMINI_API_KEY || '';

if (!apiKey && process.env.NODE_ENV === 'production') {
  console.warn('⚠️  GEMINI_API_KEY not configured - AI features will use fallback only');
}

let genAI: GoogleGenerativeAI | null = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

/**
 * Get Gemini model instance
 * @param modelName - Model to use (default: gemini-1.5-flash for speed)
 */
export function getModel(modelName: string = 'gemini-1.5-flash') {
  if (!genAI) {
    throw new Error('Gemini API not configured');
  }
  return genAI.getGenerativeModel({ model: modelName });
}

/**
 * Generate AI response with error handling
 * @param prompt - User prompt
 * @param context - Optional system context
 */
export async function generateResponse(
  prompt: string,
  context?: string
): Promise<{ success: true; text: string } | { success: false; error: string }> {
  try {
    if (!genAI) {
      return {
        success: false,
        error: 'AI_NOT_CONFIGURED',
      };
    }

    const model = getModel();

    // Build full prompt with context if provided
    const fullPrompt = context
      ? `${context}\n\nUser Query: ${prompt}`
      : prompt;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      return {
        success: false,
        error: 'EMPTY_RESPONSE',
      };
    }

    return {
      success: true,
      text: text.trim(),
    };
  } catch (error: any) {
    console.error('❌ Gemini API error:', error);

    // Handle rate limiting
    if (error.message?.includes('429') || error.message?.includes('rate limit')) {
      return {
        success: false,
        error: 'RATE_LIMIT',
      };
    }

    // Handle API errors
    if (error.message?.includes('API key')) {
      return {
        success: false,
        error: 'INVALID_API_KEY',
      };
    }

    // Generic error
    return {
      success: false,
      error: 'AI_ERROR',
    };
  }
}

/**
 * Check if Gemini API is available
 */
export function isAvailable(): boolean {
  return genAI !== null && !!apiKey;
}
