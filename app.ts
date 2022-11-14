import express, { Express, Request, Response } from "express";
import fs from "fs";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import multer from "multer";
import cron from "node-cron";
import swaggerUi from "swagger-ui-express";

import connectDB from "./config/mongoDB";
import swaggerDoc from "./swagger.json";

import { authRoutes, postRoutes } from "./routes/api";

import {
  errorLogger,
  accessLogger,
  checkAuth,
  postsScraper,
  authRole,
} from "./utils";

import ROLES from "./constants/ROLES";
// import swaggerSchemas from "./config/swaggerSchemas";

const app: Express = express();
dotenv.config();
connectDB();

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

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.post("/api/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file?.originalname}`,
  });
});

// Will run twice a week on Monday and Thurdsday at 12:00 AM at Asia/Tbilisi timezone
cron.schedule(
  "0 0 * * MON,THU",
  async () => {
    try {
      await postsScraper();
    } catch (err) {
      console.log(err);
    }
  },
  {
    timezone: "Asia/Tbilisi",
  }
);

app.post(
  "/api/scrape/posts",
  checkAuth,
  authRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const posts = await postsScraper(req.query.limit as any);

      return res.status(201).json(posts);
    } catch (err) {
      console.log(err);
      req.error = { message: err };
      return res.status(500).json(err);
    }
  }
);

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Blog Api Documentation",
};

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc, options));

app.get("/error", (req: Request, res: Response) => {
  try {
    const a = 1;
    //@ts-ignore
    a = 2;
    res.json({ a: a });
  } catch (error) {
    req.error = { message: error };
    res.status(500).json("internal server error");
  }
});

// app.get("/api/models-schema", (_, res) => res.json(swaggerSchemas));

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

const PORT = parseInt(process.env.PORT || "") || 8888;

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

export default app;
