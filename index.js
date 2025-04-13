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

// Middlewares
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "https://student-frontend-kappa.vercel.app"
  ],
  credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// Health check
app.get("/", (req, res) => res.json({ status: "healthy", message: "Server running" }));

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Endpoint not found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack || err);
  res.status(500).json({ message: "Internal server error" });
});

// ✅ Export app for Vercel
export default app;
