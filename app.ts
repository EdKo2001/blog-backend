import express, { Express, Request, Response } from "express";
import fs from "fs";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import multer from "multer";
import mongoose, { MongooseError } from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";

import { authRoutes, postRoutes } from "./routes/api";

import { errorLogger, accessLogger, checkAuth } from "./utils";

const app: Express = express();

dotenv.config();

const PORT = process.env.PORT || 8888;

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(compression());
app.use(errorLogger);
app.use(accessLogger);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Home page");
});

app.get("/error", (req: Request, res: Response) => {
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

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file?.originalname}`,
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
  //@ts-ignore
  req.error.message = "Not Found";
});

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server listening on http://localhost:" + PORT);
    });
  })
  .catch((err: MongooseError) => {
    console.log(err);
    process.exit(1);
  });
