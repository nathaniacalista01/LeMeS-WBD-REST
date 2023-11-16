import converter from "xml-js";
import fetch from "node-fetch";

export default class SoapCaller {
  private url: string;
  constructor() {
    const url: string | undefined = process.env.SOAP_URL;
    if (url) {
      this.url = url;
    } else {
      this.url = "http://host.docker.internal:8080/premium?wsdl";
    }
  }

  public async call(method: string, params?: Object) {
    const headers = {
      "Content-Type": "text/xml",
      "X-API-KEY" : process.env.SOAP_API_KEY ? process.env.SOAP_API_KEY : "RestApp",
    };
    const xml = this.buildXMLRequest(method, params);
    const response = await fetch(this.url, {
      headers: headers,
      method: "POST",
      body: xml,
    });
    const text: string = await response.text();
    const result = this.parseXML(text, method);
    return result;
  }

  private buildXMLRequest(method: string, params?: Object) {
    const paramString = this.buildXMLParams(params);
    return `
        <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            <Body>
            <${method} xmlns="http://service.LMS.com/">
                ${paramString}
            </${method}>
            </Body>
        </Envelope>
    `;
  }
  private buildXMLParams(params?: Object) {
    if (!params) {
      return "";
    }
    const keyValue = Object.keys(params).map((key) => {
      return `<${key} xmlns="">${params[key as keyof typeof params]}</${key}>`;
    });
    return keyValue.join("");
  }
  private parseXML(xml: string, method: string) {
    const json = JSON.parse(
      converter.xml2json(xml, { compact: true, spaces: 4 })
    );
    const returnVal =
      json["S:Envelope"]["S:Body"]["ns2:" + method + "Response"]["return"];
    if (!returnVal) {
      return null;
    }
    return returnVal;
  }
}
