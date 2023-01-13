import ApiURL from "../ApiURL";
import { iValidateParam ,tApiVersion } from "../../../types";

export default class ApiURLv2 extends ApiURL {
    protected apiVersion: tApiVersion = 'v2';
    protected queryParamsDefinition: iValidateParam = {};
    protected pathParamsDefinition: iValidateParam = {};
}