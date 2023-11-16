import express, { Express, Request, Response } from "express";
import { UserService } from "../service/user-service";
import { Error, Success } from "../types/type";
import { adminMiddleware } from "../middleware/admin-middleware";
import { loginMiddleware } from "../middleware/login-middleware";
import { FailedResponse, SuccessResponse } from "../utils/template";
import { Payload } from "../utils/payload";
import fs from 'fs';
import path from 'path';

export const userRouter = express.Router();

const multer = require('multer');
const STATIC_PROFPIC_PATH = 'public/profpic';
const PUBLIC_PROFPIC_PATH = process.env.APP_BASE_URL + '/profpic';

const storageFile = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, STATIC_PROFPIC_PATH);
  },
  filename: (req: any, file: any, cb: any) => {
    // const uniqueCode = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.originalname.replace(/\s/g, '');
    // const uniqueName = uniqueCode + '-' + filename;
    // req.body.profpic_path = PUBLIC_PROFPIC_PATH + '/' + uniqueName;
    cb(null, filename);
  }
});

const upload = multer({ storage: storageFile });

userRouter.post("/upload", upload.single('picture'), async (req: Request, res: Response) => {
  // console.log(req);
  // console.log(res);
});

userRouter.delete('/deleteProfpic/:filename', async (req: Request, res: Response) => {
  const filename = req.params.filename;

  // Construct the full path to the file
  const filePath = path.join(STATIC_PROFPIC_PATH, filename);

  try {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlinkSync(filePath);
      res.status(200).json({ message: 'File deleted successfully' });
    } else {
      // File not found
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


userRouter.get("/", adminMiddleware, async (req: Request, res: Response) => {
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
    return res.json(new FailedResponse(500, Error.REGISTER_FAILED));
  }
  return res.json(new SuccessResponse(response));
});

userRouter.put(
  "/:user_id",
  loginMiddleware,
  async (req: Request, res: Response) => {
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
  }
);

userRouter.delete(
  "/:user_id",
  adminMiddleware,
  async (req: Request, res: Response) => {
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
  }
);

userRouter.get(
  "/search",
  adminMiddleware,
  async (req: Request, res: Response) => {
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
  }
);

userRouter.post("/username", async (req: Request, res: Response) => {
  const { username } = req.body;
  const user_service = new UserService();
  const user = await user_service.getUserByUsername(username);
  if (!user) {
    // Mengembalikan false kalau user belum ada di database
    return res.json({
      result: false,
    });
  }
  return res.json({
    // Mengembalikan true kalau user sudah ada di database
    result: true,
  });
});

userRouter.get("/isAdmin", async (req: Request, res: Response) => {
  const payload = new Payload().getCookie(req);
  console.log(payload)
  const isAdmin = payload.isAdmin;
  return res.json(new SuccessResponse(isAdmin));
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
