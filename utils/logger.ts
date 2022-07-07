import { Request, Response } from "express";
import fs from "fs";
import morgan from "morgan";
import path from "path";

morgan.token(
  "error",
  (req: Request) => (
    //@ts-ignore
    console.log(req.error),
    //@ts-ignore
    `${req.error?.message}${req.error?.stack ? ` - ` + req.error.stack : ""}`
  )
);

const getCustomErrorMorganFormat = () =>
  JSON.stringify({
    method: ":method",
    url: ":url",
    http_version: ":http-version",
    response_time: ":response-time",
    status: ":status",
    content_length: ":res[content-length]",
    timestamp: ":date[iso]",
    headers_count: "req-headers-length",
    error: ":error",
  });

export const errorLogger = morgan(getCustomErrorMorganFormat(), {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: fs.createWriteStream(
    path.join(path.dirname(require.main!.filename), "logs/error/error.log")
  ),
});

export const accessLogger = morgan("combined", {
  stream: fs.createWriteStream(
    path.join(path.dirname(require.main!.filename), "logs/access/access.log")
  ),
});
