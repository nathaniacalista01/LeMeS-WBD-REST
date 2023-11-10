import express, { Express, Request, Response } from "express";
import { getUsers, testing } from "../service/user-service";
import { userRouter } from "../controller/user-controller";
import { courseRouter } from "../controller/course-controller";
import { premiumRouter } from "../controller/premium-controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json("hi");
});

router.use("/user", userRouter);
router.use("/course", courseRouter);
router.use("/premium",premiumRouter);

export default router;
