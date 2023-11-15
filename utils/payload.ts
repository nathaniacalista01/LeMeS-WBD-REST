import { Request } from "express";

export class Payload {
  private jwt;
  public constructor() {
    this.jwt = require("jsonwebtoken");
  }
  public getCookie(req: Request) {
    const cookieHeader = req.headers.cookie;
    const cookies = cookieHeader?.split(";");
    const resultArray = cookies?.map((cookie) => {
      const [key, value] = cookie.split("=");
      return { [key.trim()]: value.trim() };
    });
    const userObject = resultArray?.find((item) => "user" in item);
    if (!userObject) {
      return null;
    }
    const token = userObject["user"];
    if (!token) {
      return null;
    }
    // Validasi JWT
    const payload = this.jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (err: any, payload: any) => {
        if (err) {
          console.log(err);
          return null;
        }
        return payload;
      }
    );
    return payload;
  }
}
