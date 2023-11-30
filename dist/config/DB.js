"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = () => {
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
        console.error("DB_URI environment variable is not defined.");
        return;
    }
    mongoose_1.default
        .connect(dbUri)
        .then((con) => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
        .catch((err) => console.log(err));
};
exports.connectDatabase = connectDatabase;
