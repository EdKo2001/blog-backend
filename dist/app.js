"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = require("./routes/api");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 8888;
const storage = multer_1.default.diskStorage({
  destination: (_, __, cb) => {
    if (!fs_1.default.existsSync("uploads")) {
      fs_1.default.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = (0, multer_1.default)({ storage });
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static("uploads"));
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(utils_1.errorLogger);
app.use(utils_1.accessLogger);
app.get("/", (req, res) => {
  res.status(200).json("Home page");
});
app.get("/error", (req, res) => {
  try {
    const a = 1;
    //@ts-ignore
    a = 2;
    res.json({ a: a });
  } catch (error) {
    //@ts-ignore
    req.error = error;
    res.status(500).json("internal server error");
  }
});
app.use("/api/auth", api_1.authRoutes);
app.use("/posts", api_1.postRoutes);
app.post("/upload", utils_1.checkAuth, upload.single("image"), (req, res) => {
  var _a;
  res.json({
    url: `/uploads/${
      (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname
    }`,
  });
});
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
  //@ts-ignore
  req.error = { message: "Not Found" };
});
mongoose_1.default
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server listening on http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
