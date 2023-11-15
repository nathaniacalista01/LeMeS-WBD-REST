import { MaterialPremium, PrismaClient } from "@prisma/client";
import { Error, Source } from "../types/type";
import { DB } from "../db/db";
import { ModulService } from "./modul-service";

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
      return Error.FETCH_FAILED;
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
      return Error.ADD_MATERIAL_FAILED;
    }
  }
  public async editMaterial(
    material_id: number,
    title: string,
    description: string,
    source_type: Source,
    material_path: string
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
      return Error.EDIT_FAILED;
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
      return Error.DELETE_FAILED;
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
      return Error.FETCH_FAILED;
    }
  }

  public async getTeacherByModulId(modul_id: number) {
    const modul_service = new ModulService();
    const modul = await modul_service.getTeacherByModulId(modul_id);
    return modul;
  }

  public async getTeacherByMaterialId(material_id: number) {
    try {
      const material = await this.prisma.materialPremium.findUnique({
        where: {
          id: material_id,
        },
        select: {
          modul_id: true,
        },
      });
      if (material) {
        const modul_id = material.modul_id;
        const teacher_id = await this.getTeacherByModulId(modul_id);
        return teacher_id;
      } else {
        return Error.MATERIAL_NOT_FOUND;
      }
    } catch (error) {
      return Error.FETCH_FAILED;
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
