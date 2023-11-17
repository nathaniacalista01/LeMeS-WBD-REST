import { NextFunction, Request, Response } from "express";
import { Payload } from "../utils/payload";
import { FailedResponse } from "../utils/template";
import { Error } from "../types/type";

// Ini buat ngecek diakses sama PHP atau engga
export const checkAPI = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers["x-api-key"];  
  if (headers === process.env.PHP_API_KEY) {
    // Kalau diakses oleh PHP
    next();
  } else if (headers === process.env.REACT_API_KEY) {
    try {
      const payload = new Payload().getCookie(req);
      if (!payload) {
        return res.json(new FailedResponse(401, Error.UNAUTHORZIED_ACTION));
      }
      next()
    } catch (error) {
      return res.json(new FailedResponse(401, Error.UNAUTHORZIED_ACTION));
    }
  } else {
    return res.json(new FailedResponse(401, Error.UNAUTHORZIED_ACTION));
  }
};
