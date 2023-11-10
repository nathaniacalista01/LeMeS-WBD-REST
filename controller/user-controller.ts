import express,{ Express, Request, Response } from "express"
import * as UserService from "../service/user-service"

export const userRouter = express.Router();

userRouter.get("/",async (req : Request, res : Response)=>{
    const users = await UserService.getUsers();
    res.json({
        message : "All users",
        data : users
    })
})
