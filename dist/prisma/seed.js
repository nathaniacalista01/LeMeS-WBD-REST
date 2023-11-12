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
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const min = 1;
const max = 29;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Menjalankan seeding satu per satu
            yield seedUser();
            yield seedCourse();
            yield seedModule();
            yield seedMaterial();
        }
        catch (error) {
            console.error(error);
        }
        finally {
            // Disconnect dari Prisma setelah selesai
            yield prisma.$disconnect();
        }
    });
}
const seedUser = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 30; i++) {
        yield prisma.user.create({
            data: {
                username: "username " + i,
                fullname: "fullname " + i,
                password: yield bcrypt_1.default.hash("password", 10),
            },
        });
    }
});
const seedCourse = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 30; i++) {
        const randomTeacherId = Math.floor(Math.random() * (max - min + 1) + min);
        try {
            yield prisma.coursePremium.create({
                data: {
                    title: "title " + i,
                    description: "description " + i,
                    teacher_id: randomTeacherId,
                },
            });
        }
        catch (error) {
            console.log(randomTeacherId);
            console.log(error.message);
        }
    }
});
const seedModule = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 30; i++) {
        const randomCourseId = Math.floor(Math.random() * (max - min + 1) + min);
        try {
            yield prisma.modulPremium.create({
                data: {
                    title: "title " + i,
                    description: "description " + i,
                    course_id: randomCourseId,
                },
            });
        }
        catch (error) {
            console.log(randomCourseId);
            console.log(error);
        }
    }
});
const seedMaterial = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 30; i++) {
        const randomModuleId = Math.floor(Math.random() * (max - min + 1) + min);
        try {
            yield prisma.materialPremium.create({
                data: {
                    title: "title " + i,
                    description: "description " + i,
                    source_type: "PDF",
                    material_path: "/",
                    module_id: randomModuleId,
                },
            });
        }
        catch (error) {
            console.log(randomModuleId);
            console.log(error);
        }
    }
});
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
