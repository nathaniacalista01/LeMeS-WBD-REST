import { PrismaClient } from "@prisma/client";
import { DB } from "../db/db";
import bcrypt from "bcrypt";
import { UserService } from "./user-service";
import { Error, Success } from "../types/type";
const jwt = require("jsonwebtoken");

export class AuthService {
  private prisma: PrismaClient;
  private user: UserService;
  constructor() {
    const db: DB = DB.getInstance();
    this.prisma = db.getPrisma();
    this.user = new UserService();
  }
  public async login(username: string, password: string) {
    const user = await this.user.getUserByUsername(username);
    if (user && user !== Error.USER_NOT_FOUND){
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const jwt_secret_key = process.env.JWT_SECRET_KEY as string;
        const jwt_expired_time = process.env.JWT_EXPIRED_TIME as string;
        const payload = {
          id: user.id,
          username: username,
          isAdmin: user.isAdmin,
        };
        const token = jwt.sign(payload, jwt_secret_key, {
          expiresIn: jwt_expired_time,
        });
        return token;
      } else {
        return Error.WRONG_PASSWORD;
      }
    } else {
      return Error.USER_NOT_FOUND;
    }
  }
  public async register(
    username: string,
    fullname: string,
    password: string,
    image_path?: string,
    isAdmin : boolean = false,
  ) {
    const result = await this.user.addUser(
      username,
      fullname,
      password,
      isAdmin,
      image_path
    );
    return result;
  }
}
