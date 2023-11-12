import { PrismaClient } from "@prisma/client";

export class DB {
  private prisma;
  private static instance: DB;
  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  public getPrisma() {
    return this.prisma;
  }
}
