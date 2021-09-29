const express = require("express");
const router = express.Router();
const multer = require("multer");
const uuid = require("uuid").v4;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});
const upload = multer({ storage });

router.post("/", upload.array("uploads"), (req, res) => {
  res.status(201).json({ message: "file POST successfull..." });
  console.log("file POST succesfull...");
});

module.exports = router;
