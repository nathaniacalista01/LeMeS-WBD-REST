import express, { Express, Request, Response } from "express";
import { Error, Premium } from "../types/type";
import SoapCaller from "../utils/soap-caller";
import { PremiumService } from "../service/premium-service";
import { FailedResponse, SuccessResponse } from "../utils/template";

export const premiumRouter = express.Router();

premiumRouter.get("/total",async(req : Request, res : Response)=>{
  const premium_service = new PremiumService();
  try {
    const total = await premium_service.getTotalPremium();
    return res.json(new SuccessResponse(total))
  } catch (error) {
    return res.json(new FailedResponse(500,Error.INTERNAL_ERROR));
  }
})

premiumRouter.get("/", async (req: Request, res: Response) => {
  // Service yang digunakan untuk mendapatkan seluruh premium request
  const premium_service = new PremiumService();
  const { page } = req.query;
  const page_number = page ? parseInt(page.toString(), 10) : 1;
  const limit = 6;
  const data = {
    page: page_number,
    limit,
  };
  try {
    const result: Premium[] | undefined = await premium_service.getAllPremium(
      data
    );
    const totalData = await premium_service.getTotalPremium();
    if (!result || result.length === 0) {
      return res.json(new FailedResponse(404, Error.REQUEST_NOT_FOUND));
    } else {
      return res.json(new SuccessResponse(result))
    }
  } catch (error) {
    console.log(error);
    return res.json(new FailedResponse(500, Error.INTERNAL_ERROR));
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

premiumRouter.get("/filter", async (req: Request, res: Response) => {
  // Service yang digunakan untuk memfilter berdasarkan query tertentu
  const { status } = req.query;
  const premium_service = new PremiumService();
  const data = {
    filter: status,
  };
  try {
    const result: Premium[] = await premium_service.filterPremium(data);
    if (!result) {
      return res.json({
        status: 400,
        message: "Data not found",
      });
    } else {
      return res.json({
        status: 200,
        data: result,
      });
    }
  } catch (error) {
    return res.json({
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
    if (status === "Error" || status === "Not Exists") {
      res.json(new FailedResponse(404,Error.USER_NOT_FOUND))
    } else {
      res.json({
        status: 200,
        message: "User's premium status has been updated",
      });
    }
  } catch (error) {
    return res.json(new FailedResponse(500, Error.INTERNAL_ERROR));
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
      return res.json(new FailedResponse(400,Error.FETCH_FAILED));
    }
  } catch (error) {
    return res.json(new FailedResponse(500, Error.INTERNAL_ERROR));
  }
});
