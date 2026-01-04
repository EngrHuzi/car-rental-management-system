/**
 * PII (Personally Identifiable Information) filtering utility
 * Prevents AI responses from exposing sensitive user data
 */

// Patterns to detect and filter PII
const PII_PATTERNS = [
  // Email addresses
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,

  // Phone numbers (various formats)
  /\b(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,

  // Credit card numbers (basic pattern - 13-19 digits with optional spaces/dashes)
  /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{1,7}\b/g,

  // Social Security Numbers (SSN) - XXX-XX-XXXX
  /\b\d{3}-\d{2}-\d{4}\b/g,

  // API keys/tokens (common patterns)
  /\b[A-Za-z0-9_-]{20,}\b/g,

  // Database connection strings
  /mysql:\/\/[^\s]+/gi,
  /postgresql:\/\/[^\s]+/gi,
  /mongodb:\/\/[^\s]+/gi,
];

// Sensitive keywords that should be redacted
const SENSITIVE_KEYWORDS = [
  'password',
  'secret',
  'token',
  'api_key',
  'private_key',
  'credentials',
  'auth_token',
];

/**
 * Filter PII from AI response
 * @param text - AI-generated text
 * @returns Filtered text with PII redacted
 */
export function filterPII(text: string): string {
  let filtered = text;

  // Replace PII patterns with [REDACTED]
  for (const pattern of PII_PATTERNS) {
    filtered = filtered.replace(pattern, '[REDACTED]');
  }

  // Check for sensitive keywords and redact surrounding context
  for (const keyword of SENSITIVE_KEYWORDS) {
    const regex = new RegExp(`${keyword}\\s*[:=]\\s*[^\\s,;]+`, 'gi');
    filtered = filtered.replace(regex, `${keyword}: [REDACTED]`);
  }

  return filtered;
}

/**
 * Check if text contains potential PII
 * @param text - Text to check
 * @returns True if PII patterns detected
 */
export function containsPII(text: string): boolean {
  for (const pattern of PII_PATTERNS) {
    if (pattern.test(text)) {
      return true;
    }
  }

  for (const keyword of SENSITIVE_KEYWORDS) {
    const regex = new RegExp(`${keyword}\\s*[:=]`, 'i');
    if (regex.test(text)) {
      return true;
    }
  }

  return false;
}

/**
 * Sanitize user input before sending to AI
 * Prevents prompt injection and removes sensitive data
 * @param input - User input
 * @returns Sanitized input
 */
export function sanitizeInput(input: string): string {
  let sanitized = input.trim();

  // Remove excessive whitespace
  sanitized = sanitized.replace(/\s+/g, ' ');

  // Limit length to prevent abuse
  const MAX_INPUT_LENGTH = 1000;
  if (sanitized.length > MAX_INPUT_LENGTH) {
    sanitized = sanitized.substring(0, MAX_INPUT_LENGTH);
  }

  // Remove potential command injection attempts
  sanitized = sanitized.replace(/[;<>|&$`]/g, '');

  // Filter out any PII in user input
  sanitized = filterPII(sanitized);

  return sanitized;
}

/**
 * Validate AI response before returning to user
 * @param response - AI response
 * @returns Validation result
 */
export function validateResponse(response: string): {
  valid: boolean;
  filtered: string;
  warnings: string[];
} {
  const warnings: string[] = [];
  let filtered = response;

  // Check for PII
  if (containsPII(response)) {
    warnings.push('PII detected and redacted');
    filtered = filterPII(response);
  }

  // Check response length
  const MAX_RESPONSE_LENGTH = 5000;
  if (filtered.length > MAX_RESPONSE_LENGTH) {
    warnings.push('Response truncated due to length');
    filtered = filtered.substring(0, MAX_RESPONSE_LENGTH) + '... [truncated]';
  }

  // Check for empty response
  if (!filtered.trim()) {
    warnings.push('Empty response');
    return {
      valid: false,
      filtered: 'I apologize, but I could not generate a valid response. Please try rephrasing your question.',
      warnings,
    };
  }

  return {
    valid: true,
    filtered,
    warnings,
  };
}
