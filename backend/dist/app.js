"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const default_1 = __importDefault(require("./config/default"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongo_1 = __importDefault(require("./utils/mongo"));
const csurf_1 = __importDefault(require("csurf"));
const csrfProtection = (0, csurf_1.default)({
    cookie: {
        httpOnly: true,
        sameSite: default_1.default.nodeEnv === 'production' ? 'none' : 'lax',
        secure: default_1.default.nodeEnv === 'production' ? true : false
    }
});
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = default_1.default.port;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }
    async listen() {
        try {
            this.app.listen(this.port, () => {
                console.log(`Server running on the port ${this.port}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    getServer() {
        return this.app;
    }
    connectToDatabase() {
        (0, mongo_1.default)();
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)({ origin: '*', credentials: true }));
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((req, res, next) => {
            if (req.path === '/api/user/login')
                return next();
            return csrfProtection(req, res, next);
        });
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/api/', route.router);
        });
    }
    initializeErrorHandling() {
        this.app.use((err, req, res, next) => {
            if (err && err.code === 'EBADCSRFTOKEN') {
                return res.status(403).json({ error: 'Invalid CSRF token' });
            }
            next(err);
        });
    }
}
exports.default = App;
