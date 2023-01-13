import { iValidateParam, tApiVersion } from "../../types";
import UrlParser from "../UrlParser";

interface IApiURL { 
    parseURL(url: string): object;
}

export default abstract class ApiURL implements IApiURL {
    protected apiVersion: tApiVersion;
    protected queryParamsConfig: iValidateParam = {};
    protected partsDefinition: iValidateParam = {};
    protected urlParser!: UrlParser;

    constructor(apiVersion: tApiVersion){
        this.apiVersion = apiVersion;
    }

    parseURL(url: string): object {
        throw new Error("Method not implemented");
    }
}