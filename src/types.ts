export type tApiVersion = "v1" | "v2" | "v3";

export interface iQuerySearchParams {
  sort?: "desc" | "asc";
  limit?: number;
}

export interface iQueryParams extends iQuerySearchParams {
  version: string;
  collection: string;
  id: number;
}

export interface iQueryParamsConfig {
  [key: string]: (value: string) => false | string;
}
