const express = require("express");
const { createCapsule, getCapsules } = require("../controllers/capsuleController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// Route to handle file uploads for capsule media
router.post("/upload", authMiddleware, upload.single("mediaFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  // Build the file URL; adjust if using a different domain/port
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ fileUrl });
});

// Standard capsule creation route (without file upload handling)
router.post("/", authMiddleware, createCapsule);
router.get("/", authMiddleware, getCapsules);

module.exports = router;
