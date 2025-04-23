import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
connectDB();

const app = express();

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://student-frontend-kappa.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false // use true only if you're sending cookies
}));

// Body parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "healthy", message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message || err);
  
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "CORS error: Cross-origin request blocked" });
  }

  res.status(500).json({ message: "Internal server error" });
});

export default app;
