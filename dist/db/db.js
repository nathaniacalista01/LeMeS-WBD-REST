"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const client_1 = require("@prisma/client");
class DB {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    static getInstance() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }
    getPrisma() {
        return this.prisma;
    }
}
exports.DB = DB;
