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
exports.premiumRouter = void 0;
const express_1 = __importDefault(require("express"));
const premium_service_1 = require("../service/premium-service");
exports.premiumRouter = express_1.default.Router();
// Router used to get all upgrade premium request
exports.premiumRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const premium_service = new premium_service_1.PremiumService();
    try {
        const data = yield premium_service.getAllPremium();
        if (!data) {
            res.json({
                status: 400,
                message: "No premium found",
            });
        }
        else {
            res.json({
                status: 200,
                message: "Success",
                data,
            });
        }
    }
    catch (error) {
        res.json({
            status: 500,
            message: "Error",
        });
    }
}));
exports.premiumRouter.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    console.log(username);
    // const page_number = page ? parseInt(page.toString(), 10) : 1;
    const premium_service = new premium_service_1.PremiumService();
    const data = {
        username: username,
    };
    try {
        const response = yield premium_service.searchPremium(data);
        res.json({
            status: 200,
            message: response
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            status: 500,
            message: "Error",
        });
    }
}));
exports.premiumRouter.put("/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const { newStatus } = req.body;
    const data = {
        user_id: parseInt(user_id),
        newStatus: newStatus,
    };
    const premium_service = new premium_service_1.PremiumService();
    try {
        const status = yield premium_service.updatePremium(data);
        console.log("Ini status : ", status);
        if (!status) {
            res.json({
                status: 400,
                message: "User not found",
            });
        }
        else {
            res.json({
                status: 200,
                message: "User's premium status has been updated",
            });
        }
    }
    catch (error) {
        res.json({
            status: 500,
            message: "Error",
        });
    }
}));
exports.premiumRouter.delete("/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const data = {
        user_id,
    };
    const premium_service = new premium_service_1.PremiumService();
    try {
        const status = yield premium_service.deletePremium(data);
        if (status) {
            res.json({
                status: 200,
                message: "Successfully deleted a request",
            });
        }
        else {
            res.json({
                status: 400,
                message: "User not found",
            });
        }
    }
    catch (error) {
        res.json({
            status: 500,
            message: "Internal server error",
        });
    }
}));
