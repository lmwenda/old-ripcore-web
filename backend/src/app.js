import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import paypal from "paypal-rest-sdk";
import fileupload from "express-fileupload";

// Configurations

dotenv.config();

/*
 Paypal Configuration Modes:
 Sandbox
 Live

 If you are Developing or in Development mode put Sandbox but if you are pushing to the
 real branch then put Live
*/

paypal.configure({
  'mode': 'sandbox', 
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

// Initializations

const app = express();

// Connecting to Database

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to Database.")
);

// Middlewares

app.use(
  cors({
    exposedHeaders: "verification-token, user-id",
  })
);
app.use(express.json());
app.use(fileupload());

// Route Middlewares

import UserRoutes from "./Routes/UserRoutes.js";
import FileRoutes from "./Routes/FileRoutes.js";

app.use("/api/users", UserRoutes);
app.use("/api/pack", FileRoutes);

// Exporting Application

export default app;
