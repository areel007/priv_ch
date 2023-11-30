import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "dist/config/config.env" });
export const app = express();
const apiUrl = process.env.API_URL || "/api/v1";
app.use(express.json());
app.use(cors());

import { router as auth } from "./routes/auth";
import { router as chat } from "./routes/chat";
app.use(apiUrl, auth);
app.use(apiUrl, chat);
