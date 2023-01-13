import { iValidateParam, tApiVersion } from "../../types";
import UrlParser from "../UrlParser";

interface IApiURL { 
    parseURL(url: string): object;
}

export default abstract class ApiURL implements IApiURL {
    protected apiVersion: tApiVersion;
    protected queryParamsDefinition!: iValidateParam;
    protected pathParamsDefinition!: iValidateParam;
    protected urlParser!: UrlParser;

    constructor(apiVersion: tApiVersion){
        this.apiVersion = apiVersion;
    }

    /**
     * Parse the received url and return an object with the url hash
     * @param url 
     */
    parseURL(url: string): object {
        throw new Error("Method not implemented");
    }
}