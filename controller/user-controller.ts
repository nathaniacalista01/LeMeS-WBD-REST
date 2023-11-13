import express, { Express, Request, Response } from "express";
import { UserService } from "../service/user-service";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const user_service = new UserService();
  const { page } = req.query;
  const page_number = page ? parseInt(page.toString(), 10) : 1;
  if (page) {
    try {
      const users = await user_service.usersPagination(page_number);
      if (users) {
        return res.json({
          status: 200,
          data: users,
        });
      } else {
        return res.json({
          status: 400,
          data: [],
        });
      }
    } catch (error: any) {
      return res.json({
        status: 500,
        message: error.message,
      });
    }
  } else {
    return res.json({
      status: 500,
      message: "Page number invalid",
    });
  }
});

userRouter.post("/", async (req: Request, res: Response) => {
  const user_service = new UserService();
  const { username, fullname, password, image_path } = req.body;
  try {
    const response = await user_service.addUser(
      username,
      fullname,
      password,
      image_path
    );
    return res.json({
      status: 200,
      message: "Successfully add a user",
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
});

userRouter.put("/:user_id", async (req: Request, res: Response) => {
  const { username, fullname, password, image_path } = req.body;
  const { user_id } = req.params;
  const user_service = new UserService();
  try {
    const response = await user_service.editUser(
      parseInt(user_id),
      username,
      fullname,
      password,
      image_path
    );
    return res.json({
      status: 200,
      message: response,
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      messaeg: "Error updating user",
    });
  }
});

userRouter.delete("/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user_service = new UserService();
  try {
    const response = await user_service.deleteUser(parseInt(user_id));
    return res.json({
      status: 200,
      message: response,
    });
  } catch (error: any) {
    res.json({
      status: 500,
      message: error.message,
    });
  }
});

userRouter.get("/search", async (req: Request, res: Response) => {
  const { username, page } = req.query;
  const user_service = new UserService();
  const username_query = username ? username.toString() : "";
  const page_number = page ? parseInt(page.toString(), 10) : 1;
  try {
    const users = await user_service.searchUserPagination(
      username_query,
      page_number
    );
    if (users) {
      return res.json({
        status: 200,
        data: users,
      });
    } else {
      return res.json({
        status: 400,
        data: [],
      });
    }
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
});

userRouter.get("/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user_service = new UserService();
  try {
    const response = await user_service.getUser(parseInt(user_id));
    if (response) {
      return res.json({
        status: 200,
        data: response,
      });
    } else {
      return res.json({
        status: 400,
        data: [],
      });
    }
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
});
