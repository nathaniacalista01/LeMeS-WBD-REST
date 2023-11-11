import { Premium } from "../types/type";
import SoapCaller from "../utils/soap-caller";

export class PremiumService {
  private soap_caller : SoapCaller = new SoapCaller();

  public async getAllPremium() {
    // const soap_caller = new SoapCaller();
    const result: any = await this.soap_caller.call("getAllPremium");
    try {
      const response = await JSON.parse(result["_text"]);
      const data: Premium[] = response["data"];
      return data;
    } catch (error: any) {
      throw new Error(error.getMessage());
    }
  }
  
  public async updatePremium(data : Object){
    const result : any = await this.soap_caller.call("updatePremiumStatus",data);
    console.log("Ini result",result)    
    try {
      const response =result["_text"];
      if(response !== "Error"){
        return "Sucess"
      }
    } catch (error : any) {
      throw new Error(error.getMessage());
    }
  }

  public async deletePremium(data : Object){
    const result : any = await this.soap_caller.call("deleteRequest",data);
    console.log("Ini result ; ", result);
    try {
      const response = result["_text"];
      if(response !== "Error"){
        return "Success";
      }
    } catch (error) {
      return "Error"
    }
  }
  
}
