import { iValidateParam, iValidateParamResponse } from "../types";
// crear factory para crear los parsers con la definicion de los parametros
// crear un parser para cada version
// crear diagrama de secuencia
// hacer deploy con pasos
// implementar con pasos
// mostrar pruebas de resultados de unit test con pasos

class UrlParser {
  url: URL;
  protected search: URLSearchParams;
  protected pathParamsDefinition: iValidateParam = {};
  protected queryParamsDefinition: iValidateParam = {};

  constructor(url: string, pathParamsDefinition: iValidateParam, queryParamsDefinition: iValidateParam) {
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
      const validationResponse = this.pathParamsDefinition?.[partKey](part);
      if (validationResponse.error) {
        throw new Error(validationResponse.error);
      }
    }, this);
    return true;
  };

  /**
   * Transform the url path into an object with the query params
   * @returns object
   */
  parseQueryParams(): object {
    this.validateURLParts();
    const urlParts = this.parseURLParts();
    const searchParams = this.getSearchParams();
    return {
      ...urlParts,
      ...searchParams,
    };
  }

  /**
   * Parsed the url path into an object with the path params
   * @returns object
   */
  parseURLParts(): object {
    const urlParts = this.getURLParts();
    const partsKeys = Object.keys(this.pathParamsDefinition);
    let parsedPathParams: any = {};
    partsKeys.forEach((key: keyof iValidateParam, index) => {
      const res = this.pathParamsDefinition[key](urlParts[index])
      if(!res.error && res.value ){
        parsedPathParams[key] = res.value;
      }
    })
    return parsedPathParams;
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
        const response = this.queryParamsIsInValid(paramKey, value);
        if (response.error) {
          throw new Error(response.error);
        } else {
          parsedSearchParams = {
            ...parsedSearchParams,
            [paramKey]: response.value,
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
    param: keyof iValidateParam,
    value: any
  ): iValidateParamResponse {
    return this.queryParamsDefinition[param]?.(value);
  }
}

export default UrlParser;