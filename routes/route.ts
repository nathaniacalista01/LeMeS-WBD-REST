import express,{ Express, Request, Response } from "express";
import { getUsers, testing } from "../service/user-service";

const router = express.Router();

router.get("/",(req : Request, res : Response)=>{
    res.json("Hello")
})

router.get("/user",async (req : Request, res : Response)=>{
    const users = await getUsers();
    res.json({
        status : "Ok",
        data : users
    })
})
export default router;
