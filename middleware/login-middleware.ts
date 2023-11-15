import { NextFunction, Request, Response } from "express";
import { Error } from "../types/type";
const jwt = require("jsonwebtoken");

export const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Dapetin cookie di headers
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
    // Validasi JWT
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, payload: any) => {
      if (err) {
        // console.log(err);
        return next(err);
      }
      next();
    });
  }
};
