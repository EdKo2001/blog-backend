import { Request, Response, NextFunction } from "express";

const rateLimiter = (windowMs: number, maxRequests: number) => {
  const requests = new Map<string, number>();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const currentTime = Date.now();

    // Clear expired entries from the requests map
    for (const [timestamp, count] of requests.entries()) {
      if (currentTime - parseInt(timestamp) > windowMs) {
        requests.delete(timestamp);
      }
    }

    // Check if the client has exceeded the rate limit
    if (requests.has(ip) && Number(requests.get(ip)) >= maxRequests) {
      return res.status(429).json({ error: "Too many requests" });
    }

    // Increment the request count for the client's IP
    requests.set(ip, (requests.get(ip) || 0) + 1);

    // Call the next middleware or route handler
    next();
  };
};

export default rateLimiter;
