export type tApiVersion = "v1" | "v2" | "v3";
export interface iValidateParamResponse {
   error: string | false; 
   value?: any ;
}
export interface iValidateParam {
  [key: string]: (value: string) => iValidateParamResponse
}