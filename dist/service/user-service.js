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
exports.UserService = void 0;
const db_1 = require("../db/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor() {
        const db = db_1.DB.getInstance();
        this.prisma = db.getPrisma();
    }
    usersPagination(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const items_per_page = 8;
            const skip = (page - 1) * items_per_page;
            try {
                const users = yield this.prisma.user.findMany({
                    take: items_per_page,
                    skip: skip,
                });
                return users;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.prisma.user.findMany();
                return users;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    addUser(username, fullname, password, image_path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashed_password = yield bcrypt_1.default.hash(password, 10);
                const response = yield this.prisma.user.create({
                    data: {
                        username,
                        fullname,
                        password: hashed_password,
                    },
                });
                return response;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    editUser(user_id, username, fullname, password, image_path) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashed_password = yield bcrypt_1.default.hash(password, 10);
            try {
                const response = yield this.prisma.user.update({
                    where: {
                        id: user_id,
                    },
                    data: {
                        username,
                        fullname,
                        password: hashed_password,
                        image_path,
                    },
                });
                return response;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    deleteUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.user.delete({
                    where: {
                        id: user_id,
                    },
                });
                return response;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.findUnique({
                    where: {
                        id: user_id,
                    },
                });
                return user;
            }
            catch (error) {
                return new Error(error.message);
            }
        });
    }
    searchUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.prisma.user.findMany({
                    where: {
                        username: {
                            contains: username,
                        },
                    },
                });
                return users;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    searchUserPagination(username, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const items_per_page = 8;
            const skip = (page - 1) * items_per_page;
            try {
                const user = yield this.prisma.user.findMany({
                    where: {
                        username: {
                            contains: username
                        },
                    },
                    take: items_per_page,
                    skip: skip,
                });
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.UserService = UserService;
