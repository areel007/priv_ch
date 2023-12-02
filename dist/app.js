"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "dist/config/config.env" });
exports.app = (0, express_1.default)();
const corsOptions = {
    origin: ["https://privch.netlify.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
const apiUrl = process.env.API_URL || "/api/v1";
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)(corsOptions));
const auth_1 = require("./routes/auth");
const chat_1 = require("./routes/chat");
exports.app.use(apiUrl, auth_1.router);
exports.app.use(apiUrl, chat_1.router);
