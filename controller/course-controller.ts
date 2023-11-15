import express, { Express, Request, Response } from "express";
import { CourseService } from "../service/course-service";
import { Error } from "../types/type";

export const courseRouter = express.Router();

courseRouter.get("/", async (req: Request, res: Response) => {
  const course_service = new CourseService();
  console.log(req.headers)
  const { page } = req.query;
  const page_number = page ? parseInt(page.toString(), 10) : 1;
  const response = await course_service.getAllCoursePagination(page_number);
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
  });
});

courseRouter.post("/", async (req: Request, res: Response) => {
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

courseRouter.get("/:course_id", async (req: Request, res: Response) => {
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
  return res.json({
    status: 200,
    data: response,
  });
});
