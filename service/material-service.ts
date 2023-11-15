import { PrismaClient } from "@prisma/client";
import { Source } from "../types/type";
import { DB } from "../db/db";

export class MaterialService {
  private prisma: PrismaClient;
  constructor() {
    const db: DB = DB.getInstance();
    this.prisma = db.getPrisma();
  }
  public async getAllMaterials() {
    try {
      const materials = await this.prisma.materialPremium.findMany();
      return materials;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  public async addMaterial(
    title: string,
    description: string,
    source_type: Source,
    material_path: string,
    modul_id: number
  ) {
    try {
      const response = await this.prisma.materialPremium.create({
        data: {
          title,
          description,
          source_type,
          material_path,
          modul_id,
        },
      });
      return response;
    } catch (error) {
      throw new Error("Error adding modul");
    }
  }
  public async editMaterial(
    material_id: number,
    title: string,
    description: string,
    source_type: Source,
    material_path: string,
  ) {
    try {
      const response = await this.prisma.materialPremium.update({
        where: {
          id: material_id,
        },
        data: {
          title,
          description,
          source_type,
          material_path,
        },
      });
      return response;
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error updating course");
    }
  }
  public async deleteMaterial(material_id: number) {
    try {
      const response = await this.prisma.materialPremium.delete({
        where: {
          id: material_id,
        },
      });
      return response;
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error deleting from database");
    }
  }
  public async getMaterial(material_id: number) {
    try {
      const response = await this.prisma.materialPremium.findUnique({
        where: {
          id: material_id,
        },
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  public async getMaterialsModule(module_id: number) {
    try {
      const materials = await this.prisma.materialPremium.findMany({
        where: {
          modul_id: module_id,
        },
      });
      return materials;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
