import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://localhost:5173 || https://student-frontend-kappa.vercel.app/",
  credentials: true
}));

// Body Parser Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// Health Check
app.get("/", (req, res) => res.json({ status: "healthy", message: "Server is running" }));

// 404 Handler
app.use((req, res) => res.status(404).json({ message: "Endpoint not found" }));

// Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err);
  res.status(500).json({ message: "Internal server error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
