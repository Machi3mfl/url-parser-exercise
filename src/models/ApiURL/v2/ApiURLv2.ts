import ApiURL from "../ApiURL";
import { iValidateParam ,tApiVersion } from "../../../types";

export default class ApiURLv2 extends ApiURL {
    protected apiVersion: tApiVersion = 'v2';
    protected queryParamsConfig: iValidateParam = {};
    protected partsDefinition: iValidateParam = {};
    validatePaths(): boolean {
        throw new Error("Method not implemented.");
    }
    validateSeachParams(): boolean {
        throw new Error("Method not implemented.");
    }
}