"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.premiumRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.premiumRouter = express_1.default.Router();
const soap = require("soap");
exports.premiumRouter.get("/", (req, res) => {
    const soap_url = process.env.SOAP_URL;
    soap.createClient(soap_url, (err, client) => {
        if (err) {
            console.log(err);
            console.log("Error connecting to SOAP...");
            res.status(500).send("Internal server error");
        }
        else {
            client.getAllPremium({}, (err, result) => {
                if (err) {
                    console.error("Error calling getAllPremium", err);
                    res.status(500).send("Internal server error");
                }
                else {
                    const soapData = result["return"];
                    // Membentuk objek JSON yang diinginkan
                    const formattedData = JSON.parse(soapData).data;
                    res.json({
                        status: 200,
                        message: "Sucesfully get all data",
                        data: formattedData,
                    });
                }
            });
        }
    });
    // console.log(soap_url)
    // soap.createClient()
});
