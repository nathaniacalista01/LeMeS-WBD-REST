import { PrismaClient } from "@prisma/client";
import { DB } from "../db/db";
import { Error, MAX_CONTENT } from "../types/type";

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
      return Error.FETCH_FAILED;
    }
  }

  public async getAllCoursePagination(page: number) {
    const items_per_page = MAX_CONTENT.PAGINATION_TABLE;
    const take = (page - 1) * items_per_page;
    try {
      const courses = await this.prisma.coursePremium.findMany({
        take: items_per_page,
        skip: take,
      });
      return courses;
    } catch (error) {
      return Error.FETCH_FAILED;
    }
  }

  public async getAllCourseByTeacher(teacher_id : number, page : number){
    const items_per_page = MAX_CONTENT.PAGINATION_TABLE
    const skip = (page-1) * items_per_page;
    try {
      const courses = await this.prisma.coursePremium.findMany({
        where:{
          teacher_id : teacher_id
        },
        take : items_per_page,
        skip
      })
      return courses;
    } catch (error) {
      return Error.FETCH_FAILED;
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
      return Error.ADD_COURSE_FAILED;
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
      return Error.EDIT_FAILED;
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
      return Error.DELETE_FAILED;
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
      return Error.FETCH_FAILED;
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
      return Error.FETCH_FAILED;
    }
  }

  public async searchCoursePagination(title: string, page: number) {
    const items_per_page = MAX_CONTENT.PAGINATION_TABLE;
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
      return Error.FETCH_FAILED;
    }
  }
}
