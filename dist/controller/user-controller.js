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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_service_1 = require("../service/user-service");
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_service = new user_service_1.UserService();
    const { page } = req.query;
    const pageNumber = page ? parseInt(page.toString(), 10) : 1;
    if (page) {
        try {
            const users = yield user_service.usersPagination(pageNumber);
            if (users) {
                return res.json({
                    status: 200,
                    data: users,
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
                message: error.message,
            });
        }
    }
    else {
        return res.json({
            status: 500,
            message: "Page number invalid"
        });
    }
}));
exports.userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_service = new user_service_1.UserService();
    const { username, fullname, password, image_path } = req.body;
    try {
        const response = yield user_service.addUser(username, fullname, password, image_path);
        return res.json({
            status: 200,
            message: "Successfully add a user",
        });
    }
    catch (error) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
}));
exports.userRouter.put("/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, fullname, password, image_path } = req.body;
    const { user_id } = req.params;
    const user_service = new user_service_1.UserService();
    try {
        const response = yield user_service.editUser(parseInt(user_id), username, fullname, password, image_path);
        return res.json({
            status: 200,
            message: response,
        });
    }
    catch (error) {
        return res.json({
            status: 500,
            messaeg: error.message,
        });
    }
}));
exports.userRouter.delete("/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const user_service = new user_service_1.UserService();
    try {
        const response = yield user_service.deleteUser(parseInt(user_id));
        return res.json({
            status: 200,
            message: response,
        });
    }
    catch (error) {
        res.json({
            status: 500,
            message: error.message,
        });
    }
}));
exports.userRouter.get("/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const user_service = new user_service_1.UserService();
    try {
        const response = yield user_service.getUser(parseInt(user_id));
        if (response) {
            return res.json({
                status: 200,
                data: response,
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
            message: error.message,
        });
    }
}));
