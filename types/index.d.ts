export {};

declare global {
  namespace Express {
    interface Request {
      error: Record<string, any> & Record<unknown>;
      userId: JwtPayload;
    }
  }
}
