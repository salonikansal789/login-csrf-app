"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: process.env.PORT || 4000,
    mongoURI: process.env.MONGO_URI || "",
    jwtSecret: process.env.JWT_SECRET || '',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    cookieName: process.env.COOKIE_NAME || '',
    csrfCookieName: process.env.CSRF_COOKIE_NAME || '',
    nodeEnv: process.env.NODE_ENV || 'development'
};
exports.default = config;
