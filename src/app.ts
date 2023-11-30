import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "dist/config/config.env" });
export const app = express();

const corsOptions = {
  origin: ["https://privch.netlify.app", "https://privch.netlify.app"], // Add your Netlify app URL here
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const apiUrl = process.env.API_URL || "/api/v1";
app.use(express.json());
app.use(cors(corsOptions));

import { router as auth } from "./routes/auth";
import { router as chat } from "./routes/chat";
app.use(apiUrl, auth);
app.use(apiUrl, chat);
