import express, { Express, Request, Response } from "express";
import { CourseService } from "../service/course-service";

export const courseRouter = express.Router();

courseRouter.get("/", async (req: Request, res: Response) => {
  const course_service = new CourseService();
  try {
    const courses = await course_service.getAllCourse();
    if (courses) {
      return res.json({
        status: 200,
        data: courses,
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

courseRouter.post("/", async (req: Request, res: Response) => {
  const { title, description, image_path, teacher_id } = req.body;
  const courseService = new CourseService();
  try {
    const response = await courseService.addCourse(
      title,
      description,
      teacher_id,
      image_path
    );
    return res.json({
      status: 200,
      message: response,
    });
  } catch (error: any) {
    console.log(error);
    return res.json({
      status: 500,
      message: error.message,
    });
  }
});

courseRouter.put("/:course_id", async (req: Request, res: Response) => {
  const { course_id } = req.params;
  const { title, description, image_path, teacher_id } = req.body;
  const courseService = new CourseService();
  try {
    const response = await courseService.editCourse(
      parseInt(course_id),
      title,
      description,
      teacher_id,
      image_path
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

courseRouter.delete("/:course_id", async (req: Request, res: Response) => {
  const { course_id } = req.params;
  const courseService = new CourseService();
  try {
    const response = await courseService.deleteCourse(parseInt(course_id));
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
courseRouter.get("/search", async (req: Request, res: Response) => {
  const { title, page} = req.query;
  const course_service = new CourseService();
  const title_query = title ? title.toString() : "";
  const page_number = page ? parseInt(page.toString(), 10) : 1;
  try {
    const courses = await course_service.searchCoursePagination(title_query,page_number);
    if(courses){
      return res.json({
        status : 200,
        data : courses
      })
    }else{
      return res.json({
        status :400,
        data : []
      })
    }
  } catch (error : any) {
    return res.json({
      status : 500,
      message : error.message
    })
  }
});

courseRouter.get("/:course_id", async (req: Request, res: Response) => {
  const { course_id } = req.params;
  const courseService = new CourseService();
  try {
    const response = await courseService.getCourse(parseInt(course_id));
    if (!response) {
      res.json({
        status: 400,
        message: "Error getting data",
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
