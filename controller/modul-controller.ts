import express, { Express, Request, Response } from "express";
import { CourseService } from "../service/course-service";
import { ModulService } from "../service/modul-service";
import { loginMiddleware } from "../middleware/login-middleware";

export const modulRouter = express.Router();

modulRouter.get("/" ,async (req: Request, res: Response) => {
  const module_service = new ModulService();
  try {
    const moduls = await module_service.getAllModuls();
    if (moduls) {
      return res.json({
        status: 200,
        data: moduls,
      });
    } else {
      return res.json({
        status: 400,
        data: [],
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      mesasge: error,
    });
  }
});

modulRouter.post("/", loginMiddleware, async (req: Request, res: Response) => {
  // Memastikan hanya guru yang bisa edit middleware ini hanya Teacher dan 
  const { title, description, course_id } = req.body;
  const modulService = new ModulService();
  try {
    const response = await modulService.addModul(title, description, course_id);
    return res.json({
      status: 200,
      message: response,
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
});
modulRouter.put("/:modul_id", async (req: Request, res: Response) => {
  const { modul_id } = req.params;
  const { title, description } = req.body;
  const modulService = new ModulService();
  try {
    const response = await modulService.editModul(
      parseInt(modul_id),
      title,
      description,
    );
    return res.json({
      status: 200,
      message: response,
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
});
modulRouter.delete("/:modul_id", async (req: Request, res: Response) => {
  const { modul_id } = req.params;
  const modulService = new ModulService();
  try {
    const response = await modulService.deleteModul(parseInt(modul_id));
    return res.json({
      status: 200,
      message: response,
    });
  } catch (error: any) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
});

modulRouter.get("/:modul_id", async (req: Request, res: Response) => {
  const { modul_id } = req.params;
  const modulService = new ModulService();
  try {
    const response = await modulService.getModul(parseInt(modul_id));
    if (!response) {
      res.json({
        status: 400,
        message: "Data not found",
      });
    } else {
      res.json({
        status: 200,
        data: response,
      });
    }
  } catch (error: any) {
    return res.json({
      status: 400,
      message: error.message,
    });
  }
});
