import { PrismaClient } from "@prisma/client";
import { DB } from "../db/db";
import { CourseService } from "./course-service";
import { CoursePremium, Error } from "../types/type";

export class ModulService {
  private prisma: PrismaClient;
  constructor() {
    const db: DB = DB.getInstance();
    this.prisma = db.getPrisma();
  }
  public async getAllModuls() {
    try {
      const moduls = await this.prisma.modulPremium.findMany();
      return moduls;
    } catch (error: any) {
      return Error.FETCH_FAILED;
    }
  }
  public async addModul(title: string, description: string, course_id: number) {
    try {
      const response = await this.prisma.modulPremium.create({
        data: {
          title,
          description,
          course_id,
        },
      });
      return response;
    } catch (error) {
      return Error.ADD_MODULE_FAILED;
    }
  }
  public async editModul(modul_id: number, title: string, description: string) {
    try {
      const response = await this.prisma.modulPremium.update({
        where: {
          id: modul_id,
        },
        data: {
          title,
          description,
        },
      });
      return response;
    } catch (error: any) {
      console.log(error.message);
      return Error.EDIT_FAILED;
    }
  }
  public async deleteModul(modul_id: number) {
    try {
      const response = await this.prisma.modulPremium.delete({
        where: {
          id: modul_id,
        },
      });
      return response;
    } catch (error: any) {
      console.log("Ke catch disini")
      return Error.DELETE_FAILED;
    }
  }
  public async getModul(modul_id: number) {
    try {
      const response = await this.prisma.modulPremium.findUnique({
        where: {
          id: modul_id,
        },
      });
      return response;
    } catch (error: any) {
      return Error.FETCH_FAILED;
    }
  }

  public async getTeacherByCourseId(course_id: number) {
    const course_service = new CourseService();
    try {
      const course = (await course_service.getCourse(
        course_id
      )) as CoursePremium;
      if (course) {
        return course.teacher_id;
      }
    } catch (error) {
      return Error.FETCH_FAILED;
    }
  }

  public async getTeacherByModulId(modul_id: number) {
    try {
      const modul = await this.prisma.modulPremium.findUnique({
        where: {
          id: modul_id,
        },
        select: {
          course_id: true,
        },
      });
      if (modul) {
        const course_id = modul.course_id;
        const teacher_id = await this.getTeacherByCourseId(course_id);
        return teacher_id;
      }else{
        return Error.MDOULE_NOT_FOUND;
      }
    } catch (error) {
      return Error.FETCH_FAILED;
    }
  }
  public async getModulsCourse(course_id: number) {
    try {
      const moduls = await this.prisma.modulPremium.findMany({
        where: {
          course_id: course_id,
        },
      });
      return moduls;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
