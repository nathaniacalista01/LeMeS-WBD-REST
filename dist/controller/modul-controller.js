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
exports.modulRouter = void 0;
const express_1 = __importDefault(require("express"));
const modul_service_1 = require("../service/modul-service");
exports.modulRouter = express_1.default.Router();
exports.modulRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const module_service = new modul_service_1.ModulService();
    try {
        const moduls = yield module_service.getAllModuls();
        if (moduls) {
            return res.json({
                status: 200,
                data: moduls,
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
exports.modulRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, course_id } = req.body;
    const modulService = new modul_service_1.ModulService();
    try {
        const response = yield modulService.addModul(title, description, course_id);
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
exports.modulRouter.put("/:modul_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { modul_id } = req.params;
    const { title, description } = req.body;
    const modulService = new modul_service_1.ModulService();
    try {
        const response = yield modulService.editModul(parseInt(modul_id), title, description);
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
exports.modulRouter.delete("/:modul_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { modul_id } = req.params;
    const modulService = new modul_service_1.ModulService();
    try {
        const response = yield modulService.deleteModul(parseInt(modul_id));
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
exports.modulRouter.get("/:modul_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { modul_id } = req.params;
    const modulService = new modul_service_1.ModulService();
    try {
        const response = yield modulService.getModul(parseInt(modul_id));
        if (!response) {
            res.json({
                status: 400,
                message: "Error getting data",
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
