import { iQueryParamsConfig, tApiVersion } from "../../types";

interface IApiURL { 
    validatePaths(): boolean;
    validateSeachParams(): boolean;
}

export default abstract class ApiURL implements IApiURL {
    protected apiVersion: tApiVersion;
    protected queryParamsConfig: iQueryParamsConfig = {};
    protected partsDefinition: iQueryParamsConfig = {};

    constructor(apiVersion: tApiVersion){
        this.apiVersion = apiVersion;
    }

    validatePaths(): boolean {
        throw new Error("Method not implemented.");
    }

    validateSeachParams(): boolean {
        throw new Error("Method not implemented.");
    }
}