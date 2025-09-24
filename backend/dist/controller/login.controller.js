"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_service_1 = __importDefault(require("../services/login.service"));
const default_1 = __importDefault(require("../config/default"));
const user_model_1 = require("../models/user.model");
class LoginController {
    constructor() {
        this.loginService = new login_service_1.default();
        this.login = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                const token = await this.loginService.login(email, password);
                const isProd = process.env.NODE_ENV === 'production';
                res.cookie('authToken', token, {
                    httpOnly: true,
                    secure: isProd,
                    sameSite: 'lax',
                    maxAge: 1000 * 60 * 60 * 24 * 7
                });
                return res.json({ success: true });
            }
            catch (err) {
                return res.status(err.status || 500).json({ error: err.message || 'Server error' });
            }
        };
        this.csrfToken = async (req, res, next) => {
            if (typeof req.csrfToken !== 'function') {
                return res.status(500).json({ error: 'CSRF middleware not set up' });
            }
            return res.json({ csrfToken: req.csrfToken() });
        };
        this.whoami = async (req, res, next) => {
            try {
                const user = await user_model_1.UserModel.findById(req.user.id).select('-passwordHash').lean();
                if (!user)
                    return res.status(404).json({ error: 'User not found' });
                return res.json({ user });
            }
            catch (err) {
                next(err);
                return res.status(500).json({ error: 'Server error' });
            }
        };
        this.logout = async (req, res, next) => {
            res.clearCookie('authToken', {
                httpOnly: true,
                sameSite: default_1.default.nodeEnv === 'production' ? 'none' : 'lax',
                secure: default_1.default.nodeEnv === 'production' ? true : false
            });
            return res.json({ success: true });
        };
    }
}
exports.default = LoginController;
