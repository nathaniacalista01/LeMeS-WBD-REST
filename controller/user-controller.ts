import express, { Express, Request, Response } from "express";
import { UserService } from "../service/user-service";
import { Error, Success } from "../types/type";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const user_service = new UserService();
  const { page } = req.query;
  const page_number = page ? parseInt(page.toString(), 10) : 1;
  const users = await user_service.usersPagination(page_number);
  if (users == Error.FETCH_FAILED) {
    return res.json({
      status: 500,
      message: Error.FETCH_FAILED,
    });
  }
  return res.json({
    status: 200,
    data: users,
  });
});

userRouter.post("/", async (req: Request, res: Response) => {
  const user_service = new UserService();
  const { username, fullname, password, image_path } = req.body;
  const response = await user_service.addUser(
    username,
    fullname,
    password,
    image_path
  );
  if (response === Error.REGISTER_FAILED) {
    return res.json({
      status: 400,
      message: Error.REGISTER_FAILED,
    });
  }
  return res.json({
    status: 200,
    message: response,
  });
});

userRouter.put("/:user_id", async (req: Request, res: Response) => {
  const { username, fullname, password, image_path } = req.body;
  const { user_id } = req.params;
  const user_service = new UserService();
  const response = await user_service.editUser(
    parseInt(user_id),
    username,
    fullname,
    password,
    image_path
  );
  if (response === Error.EDIT_FAILED) {
    return res.json({
      status: 400,
      message: Error.EDIT_FAILED,
    });
  }
  return res.json({
    status: 200,
    data: response,
  });
});

userRouter.delete("/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user_service = new UserService();
  const response = await user_service.deleteUser(parseInt(user_id));
  if (response === Error.DELETE_FAILED) {
    return res.json({
      status: 404,
      message: Error.DELETE_FAILED,
    });
  }
  return res.json({
    status: 200,
    message: response,
  });
});

userRouter.get("/search", async (req: Request, res: Response) => {
  const { username, page } = req.query;
  const user_service = new UserService();
  const username_query = username ? username.toString() : "";
  const page_number = page ? parseInt(page.toString(), 10) : 1;
  const response = await user_service.searchUserPagination(
    username_query,
    page_number
  );
  if (response === Error.FETCH_FAILED) {
    return res.json({
      status: 400,
      message: Error.FETCH_FAILED,
    });
  }
  if (response.length === 0) {
    return res.json({
      status: 400,
      message: Error.USER_NOT_FOUND,
    });
  }
  return res.json({
    status: 200,
    data: response,
  });
});

userRouter.post("/username", async (req: Request, res: Response) => {
  const { username } = req.body;
  const user_service = new UserService();
  const user = await user_service.getUserByUsername(username);
  if (!user) {
    // Mengembalikan false kalau user belum ada di database
    return res.json({
      result : false
    });
  }
  return res.json({
    // Mengembalikan true kalau user sudah ada di database
    result : true,
  });
});

userRouter.get("/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user_service = new UserService();
  const response = await user_service.getUser(parseInt(user_id));
  if (response === Error.USER_NOT_FOUND || !response) {
    return res.json({
      status: 400,
      message: Error.USER_NOT_FOUND,
    });
  }
  return res.json({
    status: 200,
    data: response,
  });
});
