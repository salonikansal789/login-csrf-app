"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dbConnection;
const mongoose_1 = require("mongoose");
const default_1 = __importDefault(require("../config/default"));
const dbConfig = {
    url: default_1.default.mongoURI,
};
function dbConnection() {
    (0, mongoose_1.connect)(dbConfig.url)
        .then(() => {
        console.log('Mongo connected...');
    })
        .catch(err => {
        console.log('MongoDB connection error:', err);
        process.exit(-1);
    });
}
