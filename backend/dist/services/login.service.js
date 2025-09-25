"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const default_1 = __importDefault(require("../config/default"));
class LoginService {
    constructor() {
        this.login = async (email, password) => {
            if (!email || !password) {
                const err = new Error('Email and password are required');
                err.status = 400;
                throw err;
            }
            const user = await user_model_1.UserModel.findOne({ email }).lean();
            if (!user) {
                const err = new Error('Invalid credentials');
                err.status = 401;
                throw err;
            }
            const match = await bcrypt_1.default.compare(password, user.password);
            if (!match) {
                const err = new Error('Invalid credentials');
                err.status = 401;
                throw err;
            }
            return jsonwebtoken_1.default.sign({ id: user._id, email: user.email, name: user.name }, default_1.default.jwtSecret, { expiresIn: +default_1.default.jwtExpiresIn });
        };
    }
}
exports.default = LoginService;
