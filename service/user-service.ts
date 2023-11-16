import { PrismaClient } from "@prisma/client";
import { DB } from "../db/db";
import bcrypt, { hash } from "bcrypt";
import { Error, Success } from "../types/type";

export class UserService {
  private prisma: PrismaClient;
  constructor() {
    const db: DB = DB.getInstance();
    this.prisma = db.getPrisma();
  }

  public async usersPagination(page: number) {
    const items_per_page = 8;
    const skip = (page - 1) * items_per_page;
    try {
      const users = await this.prisma.user.findMany({
        take: items_per_page,
        skip: skip,
      });
      return users;
    } catch (error) {
      return Error.FETCH_FAILED;
    }
  }
  public async getAllUser() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error: any) {
      return Error.FETCH_FAILED;
    }
  }

  public async addUser(
    username: string,
    fullname: string,
    password: string,
    isAdmin : boolean = false,
    image_path?: string
  ) {
    try {
      const hashed_password = await bcrypt.hash(password, 10);
      const response = await this.prisma.user.create({
        data: {
          username,
          fullname,
          password: hashed_password,
          image_path,
          isAdmin
        },
      });
      return response;
    } catch (error: any) {
      return Error.REGISTER_FAILED;
    }
  }
  public async editUser(
    user_id: number,
    username: string,
    fullname: string,
    image_path?: string
  ) {
    try {
      const response = await this.prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          username,
          fullname,
          image_path,
        },
      });
      return response;
    } catch (error) {
      return Error.EDIT_FAILED;
    }
  }

  public async deleteUser(user_id: number) {
    try {
      const response = await this.prisma.user.delete({
        where: {
          id: user_id,
        },
      });
      return response;
    } catch (error: any) {
      return Error.DELETE_FAILED;
    }
  }

  public async getUser(user_id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: user_id,
        },
      });
      return user;
    } catch (error: any) {
      return Error.USER_NOT_FOUND;
    }
  }

  public async getUserByUsername(username: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: username,
        },
        select: {
          id: true,
          username: true,
          fullname: true,
          isAdmin: true,
          password: true,
          created_on: true,
          image_path: true,
        },
      });
      return user;
    } catch (error) {
      return Error.USER_NOT_FOUND;
    }
  }

  public async searchUser(username: string) {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          username: {
            contains: username,
          },
        },
      });
      return users;
    } catch (error: any) {
      return Error.FETCH_FAILED;
    }
  }
  public async searchUserPagination(username: string, page: number) {
    const items_per_page = 8;
    const skip = (page - 1) * items_per_page;

    try {
      const user = await this.prisma.user.findMany({
        where: {
          username: {
            contains: username,
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
