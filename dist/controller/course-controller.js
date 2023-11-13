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
exports.courseRouter = void 0;
const express_1 = __importDefault(require("express"));
const course_service_1 = require("../service/course-service");
exports.courseRouter = express_1.default.Router();
exports.courseRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course_service = new course_service_1.CourseService();
    try {
        const courses = yield course_service.getAllCourse();
        if (courses) {
            return res.json({
                status: 200,
                data: courses,
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
exports.courseRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, image_path, teacher_id } = req.body;
    const courseService = new course_service_1.CourseService();
    try {
        const response = yield courseService.addCourse(title, description, teacher_id, image_path);
        console.log(response);
        return res.json({
            status: 200,
            message: response,
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: error.message,
        });
    }
}));
exports.courseRouter.put("/:course_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course_id } = req.params;
    const { title, description, image_path, teacher_id } = req.body;
    const courseService = new course_service_1.CourseService();
    try {
        const response = yield courseService.editCourse(parseInt(course_id), title, description, teacher_id, image_path);
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
exports.courseRouter.delete("/:course_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course_id } = req.params;
    const courseService = new course_service_1.CourseService();
    try {
        const response = yield courseService.deleteCourse(parseInt(course_id));
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
exports.courseRouter.get("/:course_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course_id } = req.params;
    const courseService = new course_service_1.CourseService();
    try {
        const response = yield courseService.getCourse(parseInt(course_id));
        if (!response) {
            res.json({
                status: 400,
                message: "Error getting data",
            });
        }
        else {
            res.json({
                status: 200,
                data: response,
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
// courseRouter.put("/",)
