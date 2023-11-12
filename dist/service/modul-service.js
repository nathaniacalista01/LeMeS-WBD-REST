"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulService = void 0;
const db_1 = require("../db/db");
class ModulService {
    constructor() {
        const db = db_1.DB.getInstance();
        this.prisma = db.getPrisma();
    }
    getAllModuls() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const moduls = yield this.prisma.modulPremium.findMany();
                return moduls;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    addModul(title, description, course_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.modulPremium.create({
                    data: {
                        title,
                        description,
                        course_id,
                    },
                });
                return response;
            }
            catch (error) {
                throw new Error("Error adding modul");
            }
        });
    }
    editModul(modul_id, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.modulPremium.update({
                    where: {
                        id: modul_id,
                    },
                    data: {
                        title,
                        description,
                    },
                });
                return response;
            }
            catch (error) {
                console.log(error.message);
                throw new Error("Error updating course");
            }
        });
    }
    deleteModul(modul_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.modulPremium.delete({
                    where: {
                        id: modul_id,
                    },
                });
                return response;
            }
            catch (error) {
                console.log(error.message);
                throw new Error("Error deleting from database");
            }
        });
    }
    getModul(modul_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.modulPremium.findUnique({
                    where: {
                        id: modul_id,
                    },
                });
                return response;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.ModulService = ModulService;
