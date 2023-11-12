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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialRouter = void 0;
const express_1 = __importDefault(require("express"));
const material_service_1 = require("../service/material-service");
exports.materialRouter = express_1.default.Router();
exports.materialRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const material_service = new material_service_1.MaterialService();
    try {
        const materials = yield material_service.getAllMaterials();
        if (materials) {
            return res.json({
                status: 200,
                data: materials,
            });
        }
        else {
            return res.json({
                status: 400,
                data: [],
            });
        }
    }
    catch (error) {
        return res.json({
            status: 500,
            mesasge: error,
        });
    }
}));
exports.materialRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, source_type, material_path, modul_id } = req.body;
    const material_service = new material_service_1.MaterialService();
    try {
        const response = yield material_service.addMaterial(title, description, source_type, material_path, modul_id);
        return res.json({
            status: 200,
            message: response,
        });
    }
    catch (error) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
}));
exports.materialRouter.put("/:material_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { material_id } = req.params;
    const { title, description, source_type, material_path } = req.body;
    const material_service = new material_service_1.MaterialService();
    try {
        const response = yield material_service.editMaterial(parseInt(material_id), title, description, source_type, material_path);
        return res.json({
            status: 200,
            message: response,
        });
    }
    catch (error) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
}));
exports.materialRouter.delete("/:material_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { material_id } = req.params;
    const material_service = new material_service_1.MaterialService();
    try {
        const response = yield material_service.deleteMaterial(parseInt(material_id));
        return res.json({
            status: 200,
            message: response,
        });
    }
    catch (error) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
}));
exports.materialRouter.get("/:material_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { material_id } = req.params;
    const material_service = new material_service_1.MaterialService();
    try {
        const response = yield material_service.getMaterial(parseInt(material_id));
        if (!response) {
            res.json({
                status: 400,
                message: "Data not found",
            });
        }
        else {
            res.json({
                status: 200,
                message: response,
            });
        }
    }
    catch (error) {
        return res.json({
            status: 400,
            message: error.message,
        });
    }
}));
