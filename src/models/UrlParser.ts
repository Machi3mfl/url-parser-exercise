import { iQueryParamsConfig, iQueryParams, iQuerySearchParams } from "../types";
// crear factory para crear los parsers con la definicion de los parametros
// crear un parser para cada version
// crear diagrama de secuencia
// hacer deploy con pasos
// implementar con pasos
// mostrar pruebas de resultados de unit test con pasos

class UrlParser {
  url: URL;
  protected search: URLSearchParams;
  protected pathParamsDefinition: iQueryParamsConfig = {};
  protected queryParamsDefinition: iQueryParamsConfig = {};

  constructor(url: string, pathParamsDefinition: iQueryParamsConfig, queryParamsDefinition: iQueryParamsConfig) {
    this.url = new URL(url.toLocaleLowerCase());
    this.search = new URLSearchParams(this.url.search);
    this.pathParamsDefinition = pathParamsDefinition;
    this.queryParamsDefinition = queryParamsDefinition;
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
    const partsKeys = Object.keys(this.pathParamsDefinition);
    if (urlParts.length !== partsKeys.length) {
      throw new Error(`Error: the url ${this.url} parts are exceeded`);
    }
    urlParts.forEach((part, index) => {
      const partKey = partsKeys[index];
      const isNotValid = this.pathParamsDefinition?.[partKey](part);
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
   * Get the query params from the url and ignore the params not defined in queryParamsDefinition
   * The params defined ignore case
   * If the value of a param is not valid, throw an error
   * @returns iQuerySearchParams
   */
  getSearchParams(): iQuerySearchParams {
    let parsedSearchParams = {};
    const paramsKeys = Object.keys(this.queryParamsDefinition);
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
   * Validate if the value of the param is valid using the function defined in queryParamsDefinition.
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
    return this.queryParamsDefinition[param]?.(value);
  }
}

export default UrlParser;