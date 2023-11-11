import { Premium } from "../types/type";
import SoapCaller from "../utils/soap-caller";

export class PremiumService{
    public async getAllPremium(){
        const soap_url : string | undefined = process.env.SOAP_URL;
        if(soap_url){
            const soap_caller = new SoapCaller(soap_url);
            const result : any = await soap_caller.call("getAllPremium");
            try {
                const response = await JSON.parse(result["_text"]);
                const data : Premium[] = response["data"];
                return data;                
            } catch (error : any) {
                throw new Error(error.getMessage());
            }
        }
    }
}