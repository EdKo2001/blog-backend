import fs from "fs";
import path from "path";

const logsDir = path.join(__dirname, "logs", "access");
const logFile = path.join(logsDir, "access.log");

const errorsDir = path.join(__dirname, "logs", "error");
const errorsFile = path.join(logsDir, "error.log");

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}
// Create the errors directory if it doesn't exist
if (!fs.existsSync(errorsDir)) {
  fs.mkdirSync(errorsDir, { recursive: true });
}

// Create the log file if it doesn't exist
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, "");
}
// Create the errors file if it doesn't exist
if (!fs.existsSync(errorsFile)) {
  fs.writeFileSync(errorsFile, "");
}
