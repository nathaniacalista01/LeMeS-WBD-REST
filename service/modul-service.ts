import { PrismaClient } from "@prisma/client";
import { DB } from "../db/db";

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
      throw new Error(error.message);
    }
  }
  public async addModul(
    title: string,
    description: string,
    course_id: number,
  ) {
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
      throw new Error("Error adding modul");
    }
  }
  public async editModul(
    modul_id: number,
    title: string,
    description: string,
  ) {
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
      throw new Error("Error updating course");
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
      console.log(error.message);
      throw new Error("Error deleting from database");
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
      throw new Error(error.message);
    }
  }
}
