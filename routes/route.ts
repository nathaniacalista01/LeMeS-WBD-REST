import express,{ Express, Request, Response } from "express";
import { getUsers, testing } from "../service/user-service";
import { userRouter } from "../controller/user-controller";
import { courseRouter } from "../controller/course-controller";

const router = express.Router();

router.get("/",(req : Request, res : Response)=>{
    res.json("Hello")
})

router.use("/user",userRouter)
router.use("/course", courseRouter);

export default router;