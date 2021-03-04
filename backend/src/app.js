import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Initializations

const app = express();
dotenv.config();
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to Database.")
);

// Middlewares

app.use(cors());
app.use(express.json());

// Route Middlewares
import UserRoutes from "./Routes/UserRoutes.js";

app.use("/api/users", UserRoutes);

export default app;
