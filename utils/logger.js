const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(path.dirname(require.main.filename), "logs/access"),
});

const errorLogStream = rfs.createStream("error.log", {
  interval: "1d", // rotate daily
  path: path.join(path.dirname(require.main.filename), "logs/error"),
});

morgan.token(
  "error",
  (req, res) => `${req.error.message} - ${req.error.stack}`
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

const errorLogger = morgan(getCustomErrorMorganFormat(), {
  skip: (req, res) => res.statusCode < 400,
  stream: errorLogStream,
});

const accessLogger = morgan("combined", {
  stream: accessLogStream,
});

module.exports = {
  errorLogger,
  accessLogger,
};
