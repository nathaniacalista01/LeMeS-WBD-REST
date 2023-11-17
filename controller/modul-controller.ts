import express, { Express, Request, Response } from "express";
import { ModulService } from "../service/modul-service";
import { loginMiddleware } from "../middleware/login-middleware";
import { Payload } from "../utils/payload";
import { Error } from "../types/type";
import { FailedResponse, SuccessResponse } from "../utils/template";
import { validateTeacher } from "../utils/validate-teacher";
import { adminMiddleware } from "../middleware/admin-middleware";
import { checkAPI } from "../middleware/api-middleware";
import { CourseService } from "../service/course-service";

export const modulRouter = express.Router();

modulRouter.get("/", adminMiddleware, async (req: Request, res: Response) => {
  // Hanya bisa diakses oleh admin
  const payload = new Payload().getCookie(req);
  if (!payload || !payload.isAdmin) {
    return res.json({
      status: 401,
      message: Error.UNAUTHORZIED_ACTION,
    });
  }
  const module_service = new ModulService();
  const response = await module_service.getAllModuls();
  if (response === Error.FETCH_FAILED) {
    return res.json({
      status: 500,
      message: Error.FETCH_FAILED,
    });
  }
  if (!response) {
    return res.json({
      status: 404,
      message: Error.MDOULE_NOT_FOUND,
    });
  }
  return res.json({
    status: 200,
    data: response,
  });
});

modulRouter.post("/", loginMiddleware, async (req: Request, res: Response) => {
  // Hanya bisa diakses oleh guru yang mengajar pada course itu
  const { title, description, course_id } = req.body;
  const modul_service = new ModulService();
  const payload = new Payload().getCookie(req);

  // Mencari teacher_id berdasarkan course_id
  const teacher_id = await modul_service.getTeacherByCourseId(course_id);
  // Kalau tidak keteemut eachernya atau teachernya tidak sama dengan user yang sedang request, return error
  if ((!teacher_id || teacher_id !== payload.id) && !payload.isAdmin) {
    return res.json({
      status: 401,
      message: Error.UNAUTHORZIED_ACTION,
    });
  }
  // Add modul kalau sudah terverifikasi
  const response = await modul_service.addModul(title, description, course_id);
  if (response === Error.ADD_MODULE_FAILED) {
    return res.json({
      status: 500,
      message: Error.INTERNAL_ERROR,
    });
  }
  return res.json({
    status: 200,
    data: response,
  });
});

modulRouter.put(
  "/:modul_id",
  loginMiddleware,
  async (req: Request, res: Response) => {
    // Update modul hanya dapat dilakuakn oleh teacher
    const { modul_id } = req.params;
    const { title, description } = req.body;
    const modul_service = new ModulService();
    const payload = new Payload().getCookie(req);
    const teacher_id = await modul_service.getTeacherByModulId(
      parseInt(modul_id)
    );
    const isValid = validateTeacher(payload, teacher_id);
    if (isValid) {
      return res.json(isValid);
    }
    const response = await modul_service.editModul(
      parseInt(modul_id),
      title,
      description
    );
    if (response === Error.EDIT_FAILED) {
      return res.json({
        status: 500,
        message: Error.EDIT_FAILED,
      });
    }
    return res.json({
      status: 200,
      data: response,
    });
  }
);
modulRouter.delete(
  "/:modul_id",
  loginMiddleware,
  async (req: Request, res: Response) => {
    // Modul hanya dapat di delete oleh teacher yang mengajar di sana
    const { modul_id } = req.params;
    const modul_service = new ModulService();
    const teacher_id = await modul_service.getTeacherByModulId(
      parseInt(modul_id)
    );
    const payload = new Payload().getCookie(req);
    const notValid = validateTeacher(payload, teacher_id);
    if (notValid) {
      return res.json(notValid);
    }
    const response = await modul_service.deleteModul(parseInt(modul_id));
    if (response === Error.DELETE_FAILED) {
      res.json(new FailedResponse(500, Error.INTERNAL_ERROR));
    }
    res.json(new SuccessResponse(response));
  }
);

modulRouter.get("/:modul_id", checkAPI, async (req: Request, res: Response) => {
  // Mengakses modul bisa dari PHP dan bisa dari express
  const { modul_id } = req.params;
  const modul_service = new ModulService();
  const teacher_id = await modul_service.getTeacherByModulId(
    parseInt(modul_id)
  );
  // Validasi tambahan kalau yang akses modul beneran teacher yang ngajar
  if (req.headers["X-API-KEY"] === process.env.REACT_API_KEY) {
    const payload = new Payload().getCookie(req);
    const notValid = validateTeacher(payload, teacher_id);
    if (notValid) {
      return res.json(notValid);
    }
  }
  // Fetch modul
  const response = await modul_service.getModul(parseInt(modul_id));
  if (response === Error.FETCH_FAILED) {
    return res.json(new FailedResponse(500, Error.FETCH_FAILED));
  }
  if (!response) {
    return res.json(new FailedResponse(400, Error.MDOULE_NOT_FOUND));
  }
  return res.json(new SuccessResponse(response));
});

modulRouter.get("/course/:course_id", checkAPI,async (req: Request, res: Response) => {
  // Mendapatkan modul - modul dari id course yang ada bisa dari PHP dan express
  const { course_id } = req.params;
  const module_service = new ModulService();
  const teacher = await module_service.getTeacherByCourseId(parseInt(course_id));
  if(req.headers["x-api-key"] === "ReactApp"){
    const payload = new Payload().getCookie(req);
    if(payload.id !== teacher){
      return res.json(new FailedResponse(404, Error.UNAUTHORZIED_ACTION));
    }
  }
  const moduls = await module_service.getModulsCourse(parseInt(course_id));
  if (moduls === Error.FETCH_FAILED) {
    return res.json(new FailedResponse(500, Error.FETCH_FAILED));
  }
  if (!moduls) {
    return res.json(new FailedResponse(404, Error.MDOULE_NOT_FOUND));
  }
  return res.json(new SuccessResponse(moduls));
});
