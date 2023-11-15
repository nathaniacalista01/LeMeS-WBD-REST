import { NextFunction, Request, Response } from "express";
import { Error } from "../types/type";
const jwt = require("jsonwebtoken");

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookieHeader = req.headers.cookie;
  const cookies = cookieHeader?.split(";");
  const resultArray = cookies?.map((cookie) => {
    const [key, value] = cookie.split("=");
    return { [key.trim()]: value.trim() };
  });
  const userObject = resultArray?.find((item) => "user" in item);

  if (!userObject) {
    return res.json({
      status: 401,
      message: Error.UNAUTHORZIED_ACTION,
    });
  }
  const token = userObject["user"];
  if (!token) {
    return res.json({
      status: 401,
      message: Error.UNAUTHORZIED_ACTION,
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, payload: any) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      const isAdmin = payload.isAdmin;
      if (isAdmin) {
        return next();
      }
      return res.json({
        status: 401,
        message: Error.UNAUTHORZIED_ACTION,
      });
    });
  }
};
