"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const chat_1 = require("../controllers/chat");
exports.router = express_1.default.Router();
exports.router.route("/chat").post(chat_1.addChat).get(chat_1.getChats).delete(chat_1.deleteChats);
