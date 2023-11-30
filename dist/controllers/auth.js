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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const newUser = new user_1.User({
            username,
        });
        yield newUser.save();
        res.status(201).json({
            success: true,
            message: "new user registered",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error,
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const user = yield user_1.User.findOne({ username });
        // Check if the user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        // Generate a JWT token for user authentication
        const jwtSecretToken = String(process.env.JWT_SECRET_TOKEN);
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtSecretToken, {
            expiresIn: "1h", // Token expiration time
        });
        // Create a user object without the username field
        const userWithoutUsername = {
            _id: user._id,
        };
        res.status(200).json({
            success: true,
            user: Object.assign(Object.assign({}, userWithoutUsername), { token }),
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error,
        });
    }
});
exports.login = login;
