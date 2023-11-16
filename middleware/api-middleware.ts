import { NextFunction, Request, Response } from "express";

// Ini buat ngecek diakses sama PHP atau engga
export const checkAPI = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers["x-api-key"];
  if (headers !== process.env.PHP_API_KEY) {
    return res.json({
      status: 401,
      message: "Unathorized API source",
    });
  } else {
    next();
  }
};
