import express, { Express, Request, Response } from "express";
import { Premium } from "../types/type";
import SoapCaller from "../utils/soap-caller";
import { PremiumService } from "../service/premium-service";

export const premiumRouter = express.Router();

// Router used to get all upgrade premium request
premiumRouter.get("/",async (req: Request, res: Response) => {
  const soap_url: string | undefined = process.env.SOAP_URL;
  const premium_service = new PremiumService();
  if(soap_url){
    try {
      const data : Premium[] | undefined = await premium_service.getAllPremium();
      if(!data){
        res.json({
          status : 400,
          message : "No premium found",
        })
      }else{
        res.json({
          status : 200,
          message : "Success",
          data,
        })
      }
    } catch (error) {
      res.json({
        status : 500,
        message : "Error"
      })
    }

  }else{
    res.json("soap url not found");
  }
});

premiumRouter.put("/:user_id",  (req: Request, res: Response) => {
    
});
