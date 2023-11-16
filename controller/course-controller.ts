import express, { Express, Request, Response } from "express";
import { CourseService } from "../service/course-service";
import { Error } from "../types/type";
import { adminMiddleware } from "../middleware/admin-middleware";
import { Payload } from "../utils/payload";
import { FailedResponse, SuccessResponse } from "../utils/template";

export const courseRouter = express.Router();

courseRouter.get("/total", async (req: Request, res: Response) => {
  const course_service = new CourseService();
  const response = await course_service.getTotalData();
  if (response === Error.FETCH_FAILED) {
    return res.json(new FailedResponse(500, Error.FETCH_FAILED));
  }
  return res.json(new SuccessResponse(response));
});

courseRouter.get("/", async (req: Request, res: Response) => {
  const payload = new Payload().getCookie(req);
  const course_service = new CourseService();
  const { page } = req.query;
  const page_number = page ? parseInt(page.toString(), 10) : 1;
  const response = await course_service.getAllCoursePagination(page_number);
  const totalResponse = await course_service.getTotalData();
  if (response === Error.FETCH_FAILED) {
    return res.json({
      status: 400,
      message: Error.FETCH_FAILED,
    });
  }
  if (response.length === 0) {
    return res.json({
      status: 400,
      message: Error.COURSE_NOT_FOUND,
    });
  }
  return res.json({
    status: 200,
    data: response,
    total: totalResponse,
  });
});

courseRouter.post("/", async (req: Request, res: Response) => {
  const payload = new Payload().getCookie(req);
  if (!payload || !payload.isAdmin) {
    return res.json({
      status: 401,
      message: Error.UNAUTHORZIED_ACTION,
    });
  }
  const { title, description, image_path, teacher_id } = req.body;
  const courseService = new CourseService();
  const response = await courseService.addCourse(
    title,
    description,
    teacher_id,
    image_path
  );
  if (response === Error.ADD_COURSE_FAILED) {
    return res.json({
      status: 500,
      message: Error.ADD_COURSE_FAILED,
    });
  }
  return res.json({
    status: 200,
    message: response,
  });
});

courseRouter.put("/:course_id", async (req: Request, res: Response) => {
  const payload = new Payload().getCookie(req);
  if (!payload || !payload.isAdmin) {
    return res.json({
      status: 401,
      message: Error.UNAUTHORZIED_ACTION,
    });
  }
  const { course_id } = req.params;
  const { title, description, image_path, teacher_id } = req.body;
  const courseService = new CourseService();
  const response = await courseService.editCourse(
    parseInt(course_id),
    title,
    description,
    teacher_id,
    image_path
  );
  if (response === Error.EDIT_FAILED) {
    return res.json({
      status: 500,
      message: Error.EDIT_FAILED,
    });
  }
  return res.json({
    status: 200,
    message: response,
  });
});

courseRouter.delete("/:course_id", async (req: Request, res: Response) => {
  const payload = new Payload().getCookie(req);
  if (!payload || !payload.isAdmin) {
    return res.json({
      status: 401,
      message: Error.UNAUTHORZIED_ACTION,
    });
  }
  const { course_id } = req.params;
  const courseService = new CourseService();

  const response = await courseService.deleteCourse(parseInt(course_id));
  if (response === Error.DELETE_FAILED) {
    return res.json({
      status: 500,
      message: Error.DELETE_FAILED,
    });
  }
  return res.json({
    status: 200,
    message: response,
  });
});

courseRouter.get("/teacher", async (req: Request, res: Response) => {
  const { page } = req.query;
  const page_number = page ? parseInt(page.toString(), 10) : 1;
  try {
    const payload = new Payload().getCookie(req);
    const teacher_id = payload.id;
    const course_service = new CourseService();
    const response = await course_service.getAllCourseByTeacher(
      teacher_id,
      page_number
    );
    if (response === Error.FETCH_FAILED) {
      return res.json(new FailedResponse(500, Error.FETCH_FAILED));
    }
    if (!response) {
      return res.json(new FailedResponse(404, Error.COURSE_NOT_FOUND));
    }
    return res.json(new SuccessResponse(response));
  } catch (error) {
    return res.json(new FailedResponse(500, Error.INTERNAL_ERROR))
  }
});
// Ini dipikirkan dulu mw pake ato engga, tpi jgn dihapus
courseRouter.get("/search", async (req: Request, res: Response) => {
  const { title, page } = req.query;
  const course_service = new CourseService();
  const title_query = title ? title.toString() : "";
  const page_number = page ? parseInt(page.toString(), 10) : 1;
  const response = await course_service.searchCoursePagination(
    title_query,
    page_number
  );
  if (response === Error.FETCH_FAILED) {
    return res.json({
      status: 500,
      message: Error.FETCH_FAILED,
    });
  }
  if (response.length === 0) {
    return res.json({
      status: 400,
      message: Error.COURSE_NOT_FOUND,
    });
  }
  return res.json({
    status: 200,
    data: response,
  });
});

// Hanya bisa diakses oleh admin atau teacher yang mengajar di course ini
courseRouter.get("/:course_id", async (req: Request, res: Response) => {
  // const payload = new Payload().getCookie(req);
  const { course_id } = req.params;
  const courseService = new CourseService();
  const response = await courseService.getCourse(parseInt(course_id));
  if (response === Error.FETCH_FAILED) {
    return res.json({
      status: 500,
      message: Error.FETCH_FAILED,
    });
  }
  if (!response) {
    return res.json({
      status: 400,
      message: Error.COURSE_NOT_FOUND,
    });
  }
  // if (response.teacher_id !== payload.id && !payload.isAdmin) {
  //   return res.json({
  //     status: 401,
  //     message: Error.UNAUTHORZIED_ACTION,
  //   });
  // }
  return res.json({
    status: 200,
    data: response,
  });
});
