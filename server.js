const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 5000;

// Security middleware
app.use(helmet());

// Request logging
app.use(morgan("dev"));

// JSON handling
app.use(express.json());

// Rate limiting protection
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests detected. Try again later.",
});

app.use(limiter);

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "CyberGuard Academy Backend Running",
    status: "secure",
  });
});

// System status route
app.get("/status", (req, res) => {
  res.json({
    uptime: process.uptime(),
    platform: process.platform,
    secure: true,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
