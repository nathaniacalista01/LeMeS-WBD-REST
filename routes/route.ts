import express, { Express, Request, Response } from "express";
import { userRouter } from "../controller/user-controller";
import { courseRouter } from "../controller/course-controller";
import { premiumRouter } from "../controller/premium-controller";
import { modulRouter } from "../controller/modul-controller";
import { materialRouter } from "../controller/material-controller";
import { authRouter } from "../controller/auth-controller";
import { loginMiddleware } from "../middleware/login-middleware";
import { adminMiddleware } from "../middleware/admin-middleware";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json("hi");
});

router.use("/user",loginMiddleware,userRouter);
router.use("/course",loginMiddleware,courseRouter);
router.use("/premium",adminMiddleware,premiumRouter);
router.use("/modul",loginMiddleware,modulRouter);
router.use("/material",loginMiddleware,materialRouter);
router.use("/auth",authRouter);

export default router;
