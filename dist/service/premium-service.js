"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumService = void 0;
const soap_caller_1 = __importDefault(require("../utils/soap-caller"));
class PremiumService {
    getAllPremium() {
        return __awaiter(this, void 0, void 0, function* () {
            const soap_url = process.env.SOAP_URL;
            if (soap_url) {
                const soap_caller = new soap_caller_1.default(soap_url);
                const result = yield soap_caller.call("getAllPremium");
                try {
                    const response = yield JSON.parse(result["_text"]);
                    const data = response["data"];
                    return data;
                }
                catch (error) {
                    console.log("Masuk ke error handling ini");
                    throw new Error(error.getMessage());
                }
            }
        });
    }
}
exports.PremiumService = PremiumService;
