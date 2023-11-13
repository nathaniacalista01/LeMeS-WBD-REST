import { PrismaClient } from "@prisma/client";
import { DB } from "../db/db";

export class CourseService {
  private prisma: PrismaClient;

  constructor() {
    const db: DB = DB.getInstance();
    this.prisma = db.getPrisma();
  }
  public async getAllCourse() {
    try {
      const courses = await this.prisma.coursePremium.findMany();
      return courses;
    } catch (error) {
      throw new Error("Error getting all courses");
    }
  }

  public async addCourse(
    title: string,
    description: string,
    teacher_id: number,
    image_path?: string
  ) {
    try {
      const response = await this.prisma.coursePremium.create({
        data: {
          title,
          description,
          teacher_id,
          image_path,
        },
      });
      return response;
    } catch (error) {
      throw new Error("Error adding courses");
    }
  }
  public async editCourse(
    course_id: number,
    title: string,
    description: string,
    teacher_id: number,
    image_path?: string
  ) {
    try {
      const response = await this.prisma.coursePremium.update({
        where: {
          id: course_id,
        },
        data: {
          title,
          description,
          teacher_id,
          image_path,
        },
      });
      return response;
    } catch (error: any) {
      throw new Error("Error updating course");
    }
  }
  public async deleteCourse(course_id: number) {
    try {
      const response = await this.prisma.coursePremium.delete({
        where: {
          id: course_id,
        },
      });
      return response;
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error deleting from database");
    }
  }
  public async getCourse(course_id: number) {
    try {
      const response = await this.prisma.coursePremium.findUnique({
        where: {
          id: course_id,
        },
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async searchCourse(title: string) {
    try {
      const users = await this.prisma.coursePremium.findMany({
        where: {
          title: {
            contains: title,
          },
        },
      });
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async searchCoursePagination(title: string, page: number) {
    const items_per_page = 8;
    const skip = (page - 1) * items_per_page;
    try {
      const user = await this.prisma.coursePremium.findMany({
        where: {
          title: {
            contains: title,
          },
        },
        take: items_per_page,
        skip: skip,
      });
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
