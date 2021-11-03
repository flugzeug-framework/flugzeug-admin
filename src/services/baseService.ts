import { store } from "app/store";
import axios, { AxiosInstance } from "axios";
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const API_TIMEOUT: number = 600000 * 1.01;
export const BASE_HEADERS = {
  "Content-Type": "application/json",
};

const selectSessionToken = (state: any) => state?.session?.credentials?.token;

export interface ServiceOptions {
  include?: any[];
  where?: any;
  limit?: number;
  offset?: number;
  order?: [string, "ASC" | "DESC"][];
}

export interface ResponseData<T> {
  message?: string;
  data: T;
}

export interface ListResponseData<T> {
  message?: string;
  count: number;
  offset: number;
  limit: number;
  order?: any;
  data: T[];
}

export function prepareParams(
  options?: ServiceOptions | any
): {
  [key: string]: string;
} {
  const params: { [key: string]: string } = {};
  if (options != null) {
    for (const key in options) {
      if ((options as any)[key]) {
        params[key] = JSON.stringify((options as any)[key]);
      }
    }
  }
  return params;
}

export class BaseService<T> {
  controllerName = "default";
  baseUrl: string | undefined;
  apiTimeOut: number = API_TIMEOUT;
  _api: AxiosInstance | undefined;

  get api() {
    if (this._api == null || this.baseUrl == null) {
      this.baseUrl = API_BASE_URL;
      if (this.baseUrl == null) {
        console.warn(
          "Your REACT_APP_API_BASE_URL is not defined, make sure it is correctly set in .env"
        );
      }
      this._api = axios.create({
        timeout: this.apiTimeOut,
        headers: BASE_HEADERS,
        baseURL: `${this.baseUrl}`,
      });
    }
    return this._api;
  }

  getDefaultHeaders(): any {
    const token = selectSessionToken(store.getState());

    let defaultHeaders: any = {
      ...BASE_HEADERS,
    };
    if (token) {
      defaultHeaders = {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
    return defaultHeaders;
  }

  async getAll(options?: ServiceOptions): Promise<ListResponseData<T>> {
    const params = prepareParams(options);
    this.api.defaults.headers = this.getDefaultHeaders();
    const { data } = await this.api.get<ListResponseData<T>>(
      `/${this.controllerName}`,
      { params }
    );
    return data;
  }

  async getById(
    id: number | string,
    options?: ServiceOptions
  ): Promise<ResponseData<T>> {
    const params = prepareParams(options);
    this.api.defaults.headers = this.getDefaultHeaders();
    const { data } = await this.api.get<ResponseData<T>>(
      `/${this.controllerName}/${id}`,
      { params }
    );
    return data;
  }

  async get(): Promise<ResponseData<T>> {
    this.api.defaults.headers = this.getDefaultHeaders();
    const { data } = await this.api.get<ResponseData<T>>(
      `/${this.controllerName}`
    );
    return data;
  }

  async update(id: number | string, bodyData: T): Promise<ResponseData<T>> {
    this.api.defaults.headers = this.getDefaultHeaders();
    const { data } = await this.api.put<ResponseData<T>>(
      `/${this.controllerName}/${id}`,
      JSON.stringify(bodyData)
    );
    return data;
  }

  async create(bodyData: T): Promise<ResponseData<T>> {
    this.api.defaults.headers = this.getDefaultHeaders();
    const { data } = await this.api.post<ResponseData<T>>(
      `/${this.controllerName}`,
      JSON.stringify(bodyData)
    );
    return data;
  }

  async delete(id: number | string): Promise<ResponseData<T>> {
    this.api.defaults.headers = this.getDefaultHeaders();
    const { data } = await this.api.delete<ResponseData<T>>(
      `/${this.controllerName}/${id}`
    );
    return data;
  }
}
