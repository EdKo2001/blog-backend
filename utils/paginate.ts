import { Request, Response, NextFunction } from "express";

const paginate = (
  data?: any,
  page?: any,
  limit?: any,
  middleware?: boolean,
  model?: any
) => {
  if (!middleware) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: any = {};

    if (endIndex < data.length) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    results.total = data.length;
    results.results = data.slice(0, limit);

    return results;
  }
  return async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: any = {};

    if (endIndex < (await model.countDocuments())) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      results.total = await model.countDocuments();
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      //@ts-ignores
      res.paginate = results;
      next();
    } catch (err) {
      console.log("err");
      res.status(500).json({ message: err.message });
    }
  };
};

export default paginate;
