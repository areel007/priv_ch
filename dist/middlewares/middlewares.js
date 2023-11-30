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
exports.verifyTokenAuth = exports.verifyToken = exports.handleErrors = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const jwtSecretToken = String(process.env.JWT_SECRET_TOKEN);
const handleErrors = (error, res) => {
    if (error instanceof Error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: "An unknown error occurred.",
        });
    }
};
exports.handleErrors = handleErrors;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader; // Cast authHeader to a string
        jsonwebtoken_1.default.verify(token.split(" ")[1], jwtSecretToken, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Token is not valid",
                });
            }
            req.user = user;
            const _user = yield user_1.User.findById(req.user.userId);
            req.user = _user;
            next(); // Call next() to proceed to the next middleware
        }));
    }
    else {
        return res.status(401).json({
            success: false,
            message: "You are not authenticated",
        });
    }
};
exports.verifyToken = verifyToken;
const verifyTokenAuth = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        try {
            if (req.user) {
                next();
            }
            else {
                res.status(403).json({
                    success: false,
                    message: "you are not allowed to perform this operation",
                });
            }
        }
        catch (error) {
            (0, exports.handleErrors)(error, res);
        }
    });
};
exports.verifyTokenAuth = verifyTokenAuth;
