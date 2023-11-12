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
exports.MaterialService = void 0;
const db_1 = require("../db/db");
class MaterialService {
    constructor() {
        const db = db_1.DB.getInstance();
        this.prisma = db.getPrisma();
    }
    getAllMaterials() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materials = yield this.prisma.materialPremium.findMany();
                return materials;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    addMaterial(title, description, source_type, material_path, modul_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.materialPremium.create({
                    data: {
                        title,
                        description,
                        source_type,
                        material_path,
                        modul_id,
                    },
                });
                return response;
            }
            catch (error) {
                throw new Error("Error adding modul");
            }
        });
    }
    editMaterial(material_id, title, description, source_type, material_path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.materialPremium.update({
                    where: {
                        id: material_id,
                    },
                    data: {
                        title,
                        description,
                        source_type,
                        material_path,
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
    deleteMaterial(material_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.materialPremium.delete({
                    where: {
                        id: material_id,
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
    getMaterial(material_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.materialPremium.findUnique({
                    where: {
                        id: material_id,
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
exports.MaterialService = MaterialService;
