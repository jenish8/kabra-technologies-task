if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
//routes
const productRoutes = require("./app/routes/product.routes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  console.error("DB_URL environment variable is not defined.");
  process.exit(1);
}

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // Set a unique filename
  },
});

const upload = multer({ storage });

//Routes
app.use(productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
