"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const course_controller_1 = require("../controller/course-controller");
const premium_controller_1 = require("../controller/premium-controller");
const modul_controller_1 = require("../controller/modul-controller");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json("hi");
});
router.use("/user", user_controller_1.userRouter);
router.use("/course", course_controller_1.courseRouter);
router.use("/premium", premium_controller_1.premiumRouter);
router.use("/modul", modul_controller_1.modulRouter);
exports.default = router;
