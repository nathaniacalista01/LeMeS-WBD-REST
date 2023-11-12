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
exports.CourseService = void 0;
const client_1 = require("@prisma/client");
class CourseService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getAllCourse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield this.prisma.coursePremium.findMany();
                return courses;
            }
            catch (error) {
                throw new Error("Error getting all courses");
            }
        });
    }
    addCourse(title, description, teacher_id, image_path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.coursePremium.create({
                    data: {
                        title,
                        description,
                        teacher_id,
                        image_path,
                    },
                });
                return response;
            }
            catch (error) {
                throw new Error("Error adding courses");
            }
        });
    }
    editCourse(course_id, title, description, teacher_id, image_path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.coursePremium.update({
                    where: {
                        id: course_id,
                    },
                    data: {
                        title,
                        description,
                        teacher_id,
                        image_path,
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
    deleteCourse(course_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.coursePremium.delete({
                    where: {
                        id: course_id,
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
    getCourse(course_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.prisma.coursePremium.findUnique({
                    where: {
                        id: course_id,
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
exports.CourseService = CourseService;
