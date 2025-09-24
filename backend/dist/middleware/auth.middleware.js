"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const default_1 = __importDefault(require("../config/default"));
const JWT_SECRET = default_1.default.jwtSecret;
function requireAuth(req, res, next) {
    try {
        const token = req.cookies?.authToken;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: missing token' });
        }
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = { id: payload.id, email: payload.email, name: payload.name };
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Unauthorized: invalid token' });
    }
}
