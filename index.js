import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

connectDB();

const app = express();

// ✅ CORS MUST BE CONFIGURED BEFORE ROUTES
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://student-frontend-kappa.vercel.app"
  ],
  credentials: true // If you're using cookies/session
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.json({ status: "healthy", message: "Server is running" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack || err);
  res.status(500).json({ message: "Internal server error" });
});

export default app; // ✅ for Vercel
