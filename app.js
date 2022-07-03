const express = require("express");
const fs = require("fs");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");
const multer = require("multer");
const mongoose = require("mongoose");

// const routes = require("./routes/api");

const { logger, checkAuth } = require("./utils");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8888;

// const storage = multer.diskStorage({
//   destination: (_, __, cb) => {
//     if (!fs.existsSync("uploads")) {
//       fs.mkdirSync("uploads");
//     }
//     cb(null, "uploads");
//   },
//   filename: (_, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

app.use(express.json());
// app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(compression());
app.use(logger.errorLogger);
app.use(logger.accessLogger);

app.get("/", (req, res) => {
  res.status(200).json("Home page");
});

app.get("/error", (req, res) => {
  try {
    const a = 1;
    a = 2;
    res.json(a);
  } catch (error) {
    req.error = error;
    res.status(500).json("internal server error");
  }
});

// app.use("/auth", routes.authRoutes);
// app.use("/posts", routes.postRoutes);

// app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
//   res.json({
//     url: `/uploads/${req.file.originalname}`,
//   });
// });

app.use((req, res) => {
  res.status(404).json({
    message: "Not  Found",
  });
  req.error = error;
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log("Server listening on http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
