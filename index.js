import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",  // Your frontend URL for local development
      "https://student-frontend-kappa.vercel.app"  // Production URL
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Authorization"],
  maxAge: 86400 // Cache for 24 hours
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Handle preflight requests (OPTIONS)
app.options("*", cors(corsOptions));

// Body parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ status: "healthy", message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack || err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "Cross-origin requests not allowed" });
  }

  res.status(500).json({ message: "Internal server error" });
});

export default app;
