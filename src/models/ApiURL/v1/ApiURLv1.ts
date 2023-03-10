import ApiURL from "../ApiURL";
import { iValidateParam, tApiVersion } from "../../../types";
import { isPositiveFloat, isPositiveInteger } from "../../../utils";
import UrlParser from "../../UrlParser";

export default class ApiURLv1 extends ApiURL {
  protected apiVersion: tApiVersion = "v1";
  protected queryParamsDefinition: iValidateParam = {
    sort: (value: string) => {
      if (!["DESC", "ASC"].includes(value.toUpperCase())) {
        return {
          error: `Error: value "${value}" for "sort" search param is invalid`,
          value: value,
        };
      }
      return { error: false, value: value };
    },
    limit: (value: string) => {
      if (!isPositiveInteger(value)) {
        return {
          error: `Error: value "${value}" for "limit" search param is invalid`,
          value,
        };
      }
      return { error: false, value: parseInt(value) };
    },
  };
  protected pathParamsDefinition: iValidateParam = {
    version: (value: string) => {
      if (!isPositiveFloat(value)) {
        return {
          error: `Error: value "${value}" for "version" url param is invalid`,
          value,
        };
      }
      return { error: false, value };
    },
    api: (value: string) => {
      if (value !== "api") {
        return {
          error: `Error: value "${value}" for "api" url param is invalid`,
          value,
        };
      }
      return { error: false };
    },
    collection: (value: string) => {
      return { error: false, value };
    },
    id: (value: string) => {
      if (!isPositiveInteger(value)) {
        return {
          error: `Error: value "${value}" for "id" url param is invalid`,
          value,
        };
      }
      return { error: false, value: parseInt(value) };
    },
  };

  /**
   * Parse the received url and return an object with the url hash
   * @param url
   */
  parseURL(url: string): object {
    this.urlParser = new UrlParser(
      this.pathParamsDefinition,
      this.queryParamsDefinition
    );
    return this.urlParser.parseURL(url);
  }
}
