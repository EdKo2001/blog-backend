import { Request, Response } from "express";
import fs from "fs";
import morgan from "morgan";
import path from "path";

const logsDir = path.join(__dirname, "..", "logs", "access");
const logFile = path.join(logsDir, "access.log");
const errorsDir = path.join(__dirname, "..", "logs", "error");
const errorsFile = path.join(errorsDir, "error.log");

morgan.token(
  "error",
  (req: Request) =>
    `${req.error?.message}${req.error?.stack ? ` - ` + req.error.stack : ""}`
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

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create the errors directory if it doesn't exist
if (!fs.existsSync(errorsDir)) {
  fs.mkdirSync(errorsDir, { recursive: true });
}

// Create the log and errors files if they don't exist
fs.writeFileSync(logFile, "", { flag: "a+" });
fs.writeFileSync(errorsFile, "", { flag: "a+" });

// Configure the access and error loggers
export const accessLogger = morgan("combined", {
  stream: fs.createWriteStream(logFile, { flags: "a+" }),
});

export const errorLogger = morgan(getCustomErrorMorganFormat(), {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: fs.createWriteStream(errorsFile, { flags: "a+" }),
});
