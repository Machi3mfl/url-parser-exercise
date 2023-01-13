import ApiURL from "../ApiURL";
import { iValidateParam ,tApiVersion } from "../../../types";

export default class ApiURLv2 extends ApiURL {
    protected apiVersion: tApiVersion = 'v2';
    protected queryParamsConfig: iValidateParam = {};
    protected partsDefinition: iValidateParam = {};
}