"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.premiumRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.premiumRouter = express_1.default.Router();
const soap = require("soap");
// Router used to get all upgrade premium request
exports.premiumRouter.get("/", (req, res) => {
    const soap_url = process.env.SOAP_URL;
    soap.createClient(soap_url, (err, client) => {
        if (err) {
            res.json({
                status: 500,
                message: "Internal server error",
            });
        }
        else {
            client.getAllPremium({}, (err, result) => {
                if (err) {
                    console.error("Error calling getAllPremium", err);
                    res.json({
                        status: 500,
                        message: "Internal server error",
                    });
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
});
exports.premiumRouter.put("/:user_id", (req, res) => {
    const { user_id } = req.params;
    const { new_status } = req.body;
    const soap_url = process.env.SOAP_URL;
    if (soap_url) {
        soap.createClient(soap_url, (err, client) => {
            if (err) {
                return res.json({
                    status: 500,
                    message: "Internal server error"
                });
            }
            else {
                client.updatePremiumStatus({ user_id, newStatus: new_status }, (err, result) => {
                    if (err) {
                        return res.json({
                            status: 500,
                            message: "Internal server error"
                        });
                    }
                    else {
                        return res.json({
                            status: 200,
                            message: result["return"]
                        });
                    }
                });
            }
        });
    }
});
