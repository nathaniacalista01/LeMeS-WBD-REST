import express,{ Express, Request, Response } from "express";

export const courseRouter = express.Router()

courseRouter.get("/",async(req : Request, res : Response)=>{
    res.json("Get course")
});

