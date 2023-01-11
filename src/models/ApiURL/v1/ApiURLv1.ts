import ApiURL from "../ApiURL";
import { iQueryParamsConfig, tApiVersion } from "../../../types";
import { isPositiveFloat, isPositiveInteger } from "../../../utils";

export default class ApiURLv1 extends ApiURL {
  protected apiVersion: tApiVersion = "v1";
  protected queryParamsConfig: iQueryParamsConfig = {
    sort: (value: string) =>
      !["DESC", "ASC"].includes(value.toUpperCase())
        ? `Error: value "${value}" for "sort" search param is invalid`
        : false,
    limit: (value: string) =>
      !isPositiveInteger(value)
        ? `Error: value "${value}" for "limit" search param is invalid`
        : false,
  };
  protected partsDefinition: iQueryParamsConfig = {
    version: (value: string) =>
      !isPositiveFloat(value)
        ? `Error: value "${value}" for "version" url param is invalid`
        : false,
    api: (value: string) =>
      value !== "api"
        ? `Error: value "${value}" for "api" url param is invalid`
        : false,
    collection: (value: string) => false,
    id: (value: string) =>
      !isPositiveInteger(value)
        ? `Error: value "${value}" for "id" url param is invalid`
        : false,
  };

  validatePaths(): boolean {
    throw new Error("Method not implemented.");
  }
  validateSeachParams(): boolean {
    throw new Error("Method not implemented.");
  }
}
