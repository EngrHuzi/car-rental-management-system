/**
 * Simple in-memory cache for AI responses
 * TTL: 5 minutes (300,000 ms)
 */

interface CacheEntry {
  response: string;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Generate cache key from prompt
 * Normalizes whitespace and converts to lowercase for better matching
 */
function getCacheKey(prompt: string): string {
  return prompt.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Get cached response if available and not expired
 */
export function getCached(prompt: string): string | null {
  const key = getCacheKey(prompt);
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  const now = Date.now();
  const age = now - entry.timestamp;

  // Check if cache entry is expired
  if (age > CACHE_TTL) {
    cache.delete(key);
    return null;
  }

  console.log(`✅ Cache HIT for prompt: "${prompt.substring(0, 50)}..." (age: ${Math.round(age / 1000)}s)`);
  return entry.response;
}

/**
 * Store response in cache
 */
export function setCached(prompt: string, response: string): void {
  const key = getCacheKey(prompt);
  cache.set(key, {
    response,
    timestamp: Date.now(),
  });
  console.log(`📦 Cached response for: "${prompt.substring(0, 50)}..."`);
}

/**
 * Clear all cache entries
 */
export function clearCache(): void {
  cache.clear();
  console.log('🗑️  Cache cleared');
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { size: number; entries: number; oldestAge: number | null } {
  const now = Date.now();
  let oldestAge: number | null = null;

  for (const entry of cache.values()) {
    const age = now - entry.timestamp;
    if (oldestAge === null || age > oldestAge) {
      oldestAge = age;
    }
  }

  return {
    size: cache.size,
    entries: cache.size,
    oldestAge: oldestAge ? Math.round(oldestAge / 1000) : null, // in seconds
  };
}

/**
 * Clean up expired cache entries
 * Call periodically to prevent memory leaks
 */
export function cleanupExpired(): number {
  const now = Date.now();
  let removed = 0;

  for (const [key, entry] of cache.entries()) {
    const age = now - entry.timestamp;
    if (age > CACHE_TTL) {
      cache.delete(key);
      removed++;
    }
  }

  if (removed > 0) {
    console.log(`🧹 Cleaned up ${removed} expired cache entries`);
  }

  return removed;
}
