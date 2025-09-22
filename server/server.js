// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import moviesRoutes from './routes/movies.js';
import { askMovieBot } from './controllers/geminiChat.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
}));
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);

app.post("/api/chat", askMovieBot);
// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/cinemax", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

