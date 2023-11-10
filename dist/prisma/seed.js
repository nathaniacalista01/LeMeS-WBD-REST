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
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
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
                password: yield bcrypt.hash("password", 10),
            },
        });
    }
});
const seedCourse = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 30; i++) {
        const randomTeacherId = Math.floor(Math.random() * 30);
        yield prisma.coursePremium.create({
            data: {
                title: "title " + i,
                description: "description " + i,
                teacher_id: randomTeacherId,
            },
        });
    }
});
const seedModule = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 30; i++) {
        const randomCourseId = Math.floor(Math.random() * 30);
        yield prisma.modulPremium.create({
            data: {
                title: "title " + i,
                description: "description " + i,
                course_id: randomCourseId,
            },
        });
    }
});
const seedMaterial = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 30; i++) {
        const randomModuleId = Math.floor(Math.random() * 30);
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
