import { iValidateParam, tApiVersion } from "../../types";
import UrlParser from "../UrlParser";

interface IApiURL { 
    urlParser: UrlParser;
    parseURL(url: string): object;
}

export default abstract class ApiURL implements IApiURL {
    protected apiVersion: tApiVersion;
    protected queryParamsConfig: iValidateParam = {};
    protected partsDefinition: iValidateParam = {};
    urlParser!: UrlParser;

    constructor(apiVersion: tApiVersion){
        this.apiVersion = apiVersion;
    }

    parseURL(url: string): object {
        throw new Error("Method not implemented.");
    }
}