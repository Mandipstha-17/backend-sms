import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

// Connect DB
connectDB();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173", // Local development
      "https://student-frontend-kappa.vercel.app" // Your frontend deployed URL
    ];

    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials (cookies, session, etc.)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow necessary methods
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allow necessary headers
  exposedHeaders: ["Authorization"], // Expose the Authorization header for client access
  maxAge: 86400 // Cache preflight response for 24 hours
};

// Apply CORS with options
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

// 404 handler (for unknown routes)
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// General error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack || err);
  
  // Handle CORS errors specifically
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "Cross-origin requests not allowed" });
  }

  // Default error handler
  res.status(500).json({ message: "Internal server error" });
});

// Export app for deployment (e.g., Vercel, Heroku)
export default app;
