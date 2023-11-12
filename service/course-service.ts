import { PrismaClient } from "@prisma/client";

export class CourseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
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
      console.log(error.message);
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
}
