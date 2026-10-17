/**
 * Simple in-memory sliding window rate limiter for Serverless / Next.js edge & node runtimes.
 * Prevents rapid spam submissions on RSVP and Wishes endpoints.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const tracker = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs = 60 * 1000 // 1 minute
): { allowed: boolean; remaining: number; resetInSeconds: number } {
  const now = Date.now();
  const record = tracker.get(identifier);

  if (!record || now > record.resetTime) {
    tracker.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
  };
}
