"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.server.use(express_1.default.json());
        this.server.use("/api", route_1.default);
    }
    run() {
        this.server.listen(8000, () => {
            console.log("Server is listening...");
        });
    }
}
exports.default = App;
