import { isPositiveFloat, isPositiveInteger } from "./utils";

interface iQuerySearchParams {
  sort?: "desc" | "asc";
  limit?: number;
}

interface iQueryParams extends iQuerySearchParams {
  version: string;
  collection: string;
  id: number;
}

interface iQueryParamsConfig {
  [key: string]: (value: string) => false | string;
}

// crear factory para crear los parsers con la definicion de los parametros
// crear un parser para cada version
// crear diagrama de secuencia
// hacer deploy con pasos
// implementar con pasos
// mostrar pruebas de resultados de unit test con pasos

class UrlParser {
  url: URL;
  protected search: URLSearchParams;
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

  constructor(url: string,) {
    this.url = new URL(url.toLocaleLowerCase());
    this.search = new URLSearchParams(this.url.search);
  }

  /**
   * Divide the url path into parts delimeted by "/"
   * @returns string[]
   */
  private getURLParts = (): string[] => {
    // get parts and validate them
    // throw error if not valid
    return this.url.pathname.split("/").filter((item) => item);
  };

  /**
   * Validate all the url parts
   * If the error is not valid, throw an error
   *
   * @returns boolean
   */
  validateURLParts = (): boolean => {
    const urlParts = this.getURLParts();
    const partsKeys = Object.keys(this.partsDefinition);
    if (urlParts.length !== partsKeys.length) {
      throw new Error(`Error: the url ${this.url} parts are exceeded`);
    }
    urlParts.forEach((part, index) => {
      const partKey = partsKeys[index];
      const isNotValid = this.partsDefinition?.[partKey](part);
      if (isNotValid) {
        throw new Error(isNotValid);
      }
    }, this);
    return true;
  };

  /**
   * Transform the url path into an object with the query params
   * @returns iQueryParams
   */
  parseQueryParams(): iQueryParams {
    this.validateURLParts();
    const [apiVersion, api, collection, id] = this.getURLParts();
    const searchParams = this.getSearchParams();
    return {
      version: apiVersion,
      collection,
      id: parseInt(id),
      ...searchParams,
    };
  }

  /**
   * Get the query params from the url and ignore the params not defined in queryParamsConfig
   * The params defined ignore case
   * If the value of a param is not valid, throw an error
   * @returns iQuerySearchParams
   */
  getSearchParams(): iQuerySearchParams {
    let parsedSearchParams = {};
    const paramsKeys = Object.keys(this.queryParamsConfig);
    paramsKeys.forEach((paramKey) => {
      const value = this.search.get(paramKey);
      if (value) {
        const isNotValid = this.queryParamsIsInValid(paramKey, value);
        if (isNotValid) {
          throw new Error(isNotValid);
        } else {
          parsedSearchParams = {
            ...parsedSearchParams,
            [paramKey]: paramKey === "limit" ? parseInt(value) : value,
          };
        }
      }
    });
    return parsedSearchParams;
  }

  /**
   * Validate if the value of the param is valid using the function defined in queryParamsConfig.
   * Return false if the param is valid
   * Return string with the error if the param is not valid
   * @param param
   * @param value
   * @returns false | string
   */
  queryParamsIsInValid(
    param: keyof iQueryParamsConfig,
    value: any
  ): false | string {
    return this.queryParamsConfig[param]?.(value);
  }
}

export default UrlParser;