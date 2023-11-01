"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.server.use((0, cors_1.default)(), express_1.default.json());
    }
    run() {
        this.server.listen(3000, () => {
            console.log("Server is listening...");
        });
    }
}
exports.default = App;
