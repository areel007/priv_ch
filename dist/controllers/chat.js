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
exports.deleteChats = exports.getChats = exports.addChat = void 0;
const chat_1 = require("../models/chat");
const addChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, text } = req.body;
        const newText = new chat_1.Text({
            username,
            text,
        });
        yield newText.save();
        res.status(201).json({
            success: true,
            newText,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error,
        });
    }
});
exports.addChat = addChat;
const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield chat_1.Text.find();
        res.status(200).json({
            success: true,
            chats,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error,
        });
    }
});
exports.getChats = getChats;
const deleteChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield chat_1.Text.deleteMany();
        res.status(200).json({
            success: true,
            message: "all chats successfully deleted.",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error,
        });
    }
});
exports.deleteChats = deleteChats;
