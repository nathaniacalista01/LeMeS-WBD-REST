import { response } from "express";
import { Premium } from "../types/type";
import SoapCaller from "../utils/soap-caller";

export class PremiumService {
  private soap_caller: SoapCaller = new SoapCaller();

  public async getAllPremium(data: Object) {
    // const soap_caller = new SoapCaller();
    const result: any = await this.soap_caller.call(
      "getPremiumPagination",
      data
    );
    try {
      const response = await JSON.parse(result["_text"]);
      const data: Premium[] = response["data"];
      console.log("ini data : ", data);
      return data;
    } catch (error: any) {
      throw new Error(error.getMessage());
    }
  }

  public async updatePremium(data: Object) {
    const result: any = await this.soap_caller.call(
      "updatePremiumStatus",
      data
    );
    try {
      const response = result["_text"];
      if (response !== "Not Exists") {
        return "Sucess";
      }
    } catch (error: any) {
      throw new Error(error.getMessage());
    }
  }

  public async deletePremium(data: Object) {
    const result: any = await this.soap_caller.call("deleteRequest", data);
    try {
      const response = result["_text"];
      if (response !== "Error") {
        return "Success";
      }
    } catch (error) {
      return "Error";
    }
  }

  public async searchPremium(data: Object) {
    const result: any = await this.soap_caller.call("searchPremium", data);
    try {
      const response = await JSON.parse(result["_text"]);
      const data: Premium[] = response["data"];
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async filterPremium(data: Object) {
    const result: any = await this.soap_caller.call("filterPremium", data);
    try {
      const response = await JSON.parse(result["_text"]);
      const data: Premium[] = response["data"];
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getTotalPremium() {
    const result = await this.soap_caller.call("getTotalPremium");
    try {
      const response = await JSON.parse(result["_text"]);
      const total = parseInt(response);
      return total;
    } catch (error: any) {
      return new Error(error.mesasage);
    }
  }
}
