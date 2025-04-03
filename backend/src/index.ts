import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db";
import authRoutes from "./routes/auth.routes";
dotenv.config();

// Creating an express application
const app = express();

// Middlewares
app.use(express.json());

const allowedOrigins = process.env.CORS_ORIGIN!.split(",");
app.use(
  cors({
    origin: allowedOrigins,
  })
);

// Connecting with Database
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT || 8000, () => {
      console.log(`Server is listening on PORT: ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB Connection Failed", error);
  });

app.get("/health", (req, res) => {
  res.send("Backend is healthy!");
});


// API CALLS

app.use("/api/v1/auth", authRoutes);