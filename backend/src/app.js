import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileupload from "express-fileupload";

// Initializations

const app = express();
dotenv.config();

// Connecting to Database

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to Database.")
);

// Middlewares

app.use(cors());
app.use(express.json());
app.use(fileupload());

// Route Middlewares
import UserRoutes from "./Routes/UserRoutes.js";
import FileRoutes from "./Routes/FileRoutes.js";

app.use("/api/users", UserRoutes);
app.use("/api/pack", FileRoutes);

// Exporting Application

export default app;
