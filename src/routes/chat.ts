import express from "express";
import { addChat, deleteChats, getChats } from "../controllers/chat";

export const router = express.Router();

router.route("/chat").post(addChat).get(getChats).delete(deleteChats);
