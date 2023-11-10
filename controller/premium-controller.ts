import express, { Express, Request, Response } from "express";
import { Premium } from "../types/type";

export const premiumRouter = express.Router();
const soap = require("soap");

// Router used to get all upgrade premium request
premiumRouter.get("/", (req: Request, res: Response) => {
  const soap_url: string | undefined = process.env.SOAP_URL;
  soap.createClient(soap_url, (err: any, client: any) => {
    if (err) {
      res.json({
        status: 500,
        message: "Internal server error",
      });
    } else {
      client.getAllPremium({}, (err: any, result: any) => {
        if (err) {
          console.error("Error calling getAllPremium", err);
          res.json({
            status: 500,
            message: "Internal server error",
          });
        } else {
          const soapData: any = result["return"];

          // Membentuk objek JSON yang diinginkan
          const formattedData: Premium[] = JSON.parse(soapData).data;
          res.json({
            status: 200,
            message: "Sucesfully get all data",
            data: formattedData,
          });
        }
      });
    }
  });
});

premiumRouter.put("/:user_id",  (req: Request, res: Response) => {
    const {user_id} = req.params
    const {new_status} = req.body;
    const soap_url : string | undefined = process.env.SOAP_URL;
    if(soap_url){
        soap.createClient(soap_url,(err : any,client : any) =>{
            if(err){
                return res.json({
                    status : 500,
                    message : "Internal server error"
                })
            }else{
                client.updatePremiumStatus({user_id, newStatus : new_status}, (err : any, result : any)=>{
                    if(err){
                        return res.json({
                            status : 500,
                            message : "Internal server error"
                        })
                    }else{
                        return res.json({
                            status : 200,
                            message : result["return"]
                        })
                    }
                } )
            }
        })
    }
});
