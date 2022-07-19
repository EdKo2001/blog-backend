declare namespace Express {
  interface Request {
    userId: number;
    error: {
      name?: string;
      message: string;
      stack?: string;
    };
  }
}
