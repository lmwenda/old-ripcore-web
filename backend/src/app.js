import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Initializations

const app = express();
dotenv.config();

// Connecting to Database

export const conn = mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to Database.")
);


// Middlewares

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('uploads'));

// Route Middlewares
import UserRoutes from "./Routes/UserRoutes.js";
import FileRoutes from "./Routes/FileRoutes.js";

app.use("/api/users", UserRoutes);
app.use('/api/files', FileRoutes);

// Exporting Application

export default app;
