"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app_1 = require("./app");
const chat_1 = require("./models/chat");
const httpServer = (0, http_1.createServer)(app_1.app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "https://privch.netlify.app/",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
// Connecting DB
const DB_1 = require("./config/DB");
(0, DB_1.connectDatabase)();
io.on("connection", (socket) => {
    console.log("A user is connected");
    // Handle chatMessage event
    socket.on("chatMessage", (message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Save the message to MongoDB
            const newText = new chat_1.Text({
                username: message.username,
                text: message.text,
            });
            yield newText.save();
            // Retrieve all messages after saving
            const messages = yield chat_1.Text.find();
            // Emit the message to all connected clients except the sender
            socket.broadcast.emit("chatMessage", message);
            // Send the updated messages to all clients
            io.emit("updateMessages", messages);
        }
        catch (error) {
            console.error("Error handling chatMessage:", error.message);
        }
    }));
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
httpServer.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on ${process.env.PORT}`);
});
