export {};

declare global {
  namespace Express {
    interface Request {
      error: any;
      userId: any;
    }
  }
}
