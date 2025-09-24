"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = __importDefault(require("../controller/login.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
class LoginRoute {
    constructor() {
        this.path = '/user';
        this.router = (0, express_1.Router)();
        this.loginController = new login_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/login`, this.loginController.login);
        this.router.get(`${this.path}/csrf-token`, this.loginController.csrfToken);
        this.router.get(`${this.path}/whoami`, auth_middleware_1.requireAuth, this.loginController.whoami);
        this.router.post(`${this.path}/logout`, auth_middleware_1.requireAuth, this.loginController.logout);
    }
}
exports.default = LoginRoute;
