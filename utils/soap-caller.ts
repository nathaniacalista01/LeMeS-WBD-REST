import converter from "xml-js";

export default class SoapCaller {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  public async call(method: string, params?: Object) {
    const headers = {
      "Content-Type": "text/xml",
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

    // const temp = JSON.parse(returnVal);
    // console.log("Ini temp : ", temp);
    // console.log("Ini return val", returnVal);
    if (!returnVal) {
      return null;
    }
    return returnVal;
    // return this.buildResponseJSON(returnVal);
  }

  private buildResponseJSON(json: JSON) {
    if (Array.isArray(json)) {
      return json.map((item) => this.flatten(item));
    }
    return this.flatten(json);
  }

  private flatten(json: JSON): JSON {
    const response: any = {};

    Object.keys(json).forEach((key) => {
      const value = json[key as keyof typeof json];
      response[key] = value["_text" as keyof typeof value];
    });

    return response;
  }
}
