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
const xml_js_1 = __importDefault(require("xml-js"));
class SoapCaller {
    constructor(url) {
        this.url = url;
    }
    call(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "Content-Type": "text/xml",
            };
            const xml = this.buildXMLRequest(method, params);
            const response = yield fetch(this.url, {
                headers: headers,
                method: "POST",
                body: xml,
            });
            const text = yield response.text();
            const result = this.parseXML(text, method);
            return result + "asdasdsadas";
        });
    }
    buildXMLRequest(method, params) {
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
    buildXMLParams(params) {
        if (!params) {
            return "";
        }
        const keyValue = Object.keys(params).map((key) => {
            return `<${key} xmlns="">${params[key]}</${key}>`;
        });
        return keyValue.join("");
    }
    parseXML(xml, method) {
        const json = JSON.parse(xml_js_1.default.xml2json(xml, { compact: true, spaces: 4 }));
        const returnVal = json["S:Envelope"]["S:Body"]["ns2:" + method + "Response"]["return"];
        // const temp = JSON.parse(returnVal);
        // console.log("Ini temp : ", temp);
        // console.log("Ini return val", returnVal);
        if (!returnVal) {
            return null;
        }
        return returnVal;
        // return this.buildResponseJSON(returnVal);
    }
    buildResponseJSON(json) {
        if (Array.isArray(json)) {
            return json.map((item) => this.flatten(item));
        }
        return this.flatten(json);
    }
    flatten(json) {
        const response = {};
        Object.keys(json).forEach((key) => {
            const value = json[key];
            response[key] = value["_text"];
        });
        return response;
    }
}
exports.default = SoapCaller;
