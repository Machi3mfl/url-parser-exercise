import ApiURL from "../ApiURL";
import { iQueryParamsConfig, tApiVersion } from "../../../types";

export default class ApiURLv2 extends ApiURL {
    protected apiVersion: tApiVersion = 'v2';
    protected queryParamsConfig: iQueryParamsConfig = {};
    protected partsDefinition: iQueryParamsConfig = {};
    validatePaths(): boolean {
        throw new Error("Method not implemented.");
    }
    validateSeachParams(): boolean {
        throw new Error("Method not implemented.");
    }
}