import express, { Express, Request, Response } from "express";
import { Premium } from "../types/type";
import SoapCaller from "../utils/soap-caller";
import { PremiumService } from "../service/premium-service";

export const premiumRouter = express.Router();

premiumRouter.get("/", async (req: Request, res: Response) => {
  // Service yang digunakan untuk mendapatkan seluruh premium request
  const premium_service = new PremiumService();
  try {
    const data: Premium[] | undefined = await premium_service.getAllPremium();
    if (!data) {
      res.json({
        status: 400,
        message: "No premium found",
      });
    } else {
      res.json({
        status: 200,
        message: "Success",
        data,
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Error",
    });
  }
});


premiumRouter.get("/search", async (req: Request, res: Response) => {
  // Service yang digunakan untuk search request berdasarkan username

  const { username } = req.query;
  // const page_number = page ? parseInt(page.toString(), 10) : 1;
  const premium_service = new PremiumService();
  const data = {
    username: username,
  };
  try {
    const response = await premium_service.searchPremium(data);
    return res.json({
      status: 200,
      message: response,
    });
  } catch (error) {
    // console.log(error);
    res.json({
      status: 500,
      message: "Error",
    });
  }
});

premiumRouter.put("/:user_id", async (req: Request, res: Response) => {
  // Service yang digunakan untuk memperbaharui status premium dari seorang pengguna
  const { user_id } = req.params;
  const { newStatus } = req.body;
  const data = {
    user_id: parseInt(user_id),
    newStatus: newStatus,
  };
  const premium_service = new PremiumService();
  try {
    const status = await premium_service.updatePremium(data);
    if (status) {
      res.json({
        status: 400,
        message: "User not found",
      });
    } else {
      res.json({
        status: 200,
        message: "User's premium status has been updated",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Error",
    });
  }
});

premiumRouter.delete("/:user_id", async (req: Request, res: Response) => {
  // Service yang digunakan untuk menghapus data request premium berdasarkan user_id
  const { user_id } = req.params;
  const data = {
    user_id,
  };
  const premium_service = new PremiumService();
  try {
    const status = await premium_service.deletePremium(data);
    if (status) {
      res.json({
        status: 200,
        message: "Successfully deleted a request",
      });
    } else {
      res.json({
        status: 400,
        message: "User not found",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: "Internal server error",
    });
  }
});
