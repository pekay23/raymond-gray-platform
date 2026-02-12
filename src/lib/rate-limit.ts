const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple in-memory rate limiter using a sliding window per key (IP address).
 *
 * @param key   - Unique identifier (e.g. IP address)
 * @param max   - Maximum requests allowed within the window (default: 5)
 * @param windowMs - Time window in milliseconds (default: 15 minutes)
 * @returns {{ success: boolean, remaining: number }}
 */
export function rateLimit(
    key: string,
    { max = 5, windowMs = 15 * 60 * 1000 } = {}
): { success: boolean; remaining: number } {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    // Clean up expired entries periodically (every 100 calls)
    if (Math.random() < 0.01) {
        for (const [k, v] of rateLimitMap) {
            if (now > v.resetTime) rateLimitMap.delete(k);
        }
    }

    if (!entry || now > entry.resetTime) {
        // First request or window expired — start fresh
        rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
        return { success: true, remaining: max - 1 };
    }

    if (entry.count >= max) {
        return { success: false, remaining: 0 };
    }

    entry.count++;
    return { success: true, remaining: max - entry.count };
}
