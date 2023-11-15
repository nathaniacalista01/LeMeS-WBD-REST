import express, { Express, Request, Response } from "express";
import { AuthService } from "../service/auth-service";
import { Error, Success, User } from "../types/type";

export const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const auth_service = new AuthService();
  const result = await auth_service.login(username, password);
  if (result == Error.USER_NOT_FOUND) {
    return res.json({
      status: 404,
      message: Error.USER_NOT_FOUND,
    });
  }
  if (result === Error.WRONG_PASSWORD) {
    return res.json({
      status: 401,
      message: Error.WRONG_PASSWORD,
    });
  }
  res.cookie("user", result, {
    maxAge: 3600000,
    httpOnly: true,
  });
  return res.json({
    status: 200,
    message: Success.LOGIN_SUCCESS,
  });
});

authRouter.post("/register", async (req: Request, res: Response) => {
  const { username, fullname, password, image_path } = req.body;
  const auth_service = new AuthService();
  const result = await auth_service.register(
    username,
    fullname,
    password,
    image_path
  );
  if (result == Error.REGISTER_FAILED) {
    return res.json({
      status: 400,
      message: Error.REGISTER_FAILED,
    });
  }
  return res.json({
    status: 200,
    data: result,
  });
});
