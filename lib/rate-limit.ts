import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiters for different endpoints
export const registrationRateLimiter = new RateLimiterMemory({
  points: 3, // 3 requests
  duration: 3600, // per hour
});

export const passwordResetRateLimiter = new RateLimiterMemory({
  points: 3, // 3 requests
  duration: 3600, // per hour
});

export const loginRateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 900, // per 15 minutes
});
