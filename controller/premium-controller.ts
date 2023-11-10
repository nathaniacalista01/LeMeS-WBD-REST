import express, { Express, Request, Response } from "express";
import { Premium } from "../types/type";

export const premiumRouter = express.Router();
const soap = require("soap");

premiumRouter.get("/", (req: Request, res: Response) => {
  const soap_url: string | undefined = process.env.SOAP_URL;
  soap.createClient(soap_url, (err: any, client: any) => {
    if (err) {
      console.log(err);
      console.log("Error connecting to SOAP...");
      res.status(500).send("Internal server error");
    } else {
      client.getAllPremium({}, (err: any, result: any) => {
        if (err) {
          console.error("Error calling getAllPremium", err);
          res.status(500).send("Internal server error");
        } else {
          const soapData: any = result["return"];

          // Membentuk objek JSON yang diinginkan
          const formattedData : Premium[] = JSON.parse(soapData).data;
            res.json({
                status : 200,
                message : "Sucesfully get all data",
                data : formattedData,
            })
        }
      });
    }
  });
  // console.log(soap_url)
  // soap.createClient()
});
