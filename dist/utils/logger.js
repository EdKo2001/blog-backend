"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessLogger = exports.errorLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
// const accessLogStream = rfs.createStream("access.log", {
//   interval: "5s", // rotate daily
//   path: path.join(path.dirname(require.main!.filename), "logs/access"),
// });
// const errorLogStream = rfs.createStream("error.log", {
//   interval: "5s", // rotate daily
//   path: path.join(path.dirname(require.main!.filename), "logs/error"),
// });
morgan_1.default.token("error", (req) => { var _a, _b, _c; return `${(_a = req.error) === null || _a === void 0 ? void 0 : _a.message}${((_b = req.error) === null || _b === void 0 ? void 0 : _b.stack) ? ` - ` + ((_c = req.error) === null || _c === void 0 ? void 0 : _c.stack) : ""}`; });
const getCustomErrorMorganFormat = () => JSON.stringify({
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
exports.errorLogger = (0, morgan_1.default)(getCustomErrorMorganFormat(), {
    skip: (req, res) => res.statusCode < 400,
    stream: fs_1.default.createWriteStream(path_1.default.join(path_1.default.dirname(require.main.filename), "logs/error/error.log")),
});
exports.accessLogger = (0, morgan_1.default)("combined", {
    stream: fs_1.default.createWriteStream(path_1.default.join(path_1.default.dirname(require.main.filename), "logs/access/access.log")),
});
