import axios, { AxiosInstance } from "axios";
import { Credentials } from "models/credentialsModel";
import {
  API_BASE_URL,
  API_TIMEOUT,
  BaseService,
  BASE_HEADERS,
  ResponseData,
} from "./baseService";

class AuthService extends BaseService<Credentials> {
  controllerName = "auth";
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

  async refresh(
    currentCredentials: Credentials
  ): Promise<ResponseData<Credentials>> {
    const { data } = await this.api.post<ResponseData<Credentials>>(
      `/${this.controllerName}/refresh`,
      undefined,
      {
        headers: {
          ...BASE_HEADERS,
          Authorization: `Bearer ${currentCredentials.refresh_token.token}`,
        },
      }
    );
    return data;
  }

  async login(
    email: string,
    password: string
  ): Promise<ResponseData<Credentials>> {
    this.api.defaults.headers = this.getDefaultHeaders();

    const { data } = await this.api.post<ResponseData<Credentials>>(
      `/emailauth/login`,
      {
        email,
        password,
      }
    );

    return data;
  }

  async logout(): Promise<ResponseData<Credentials>> {
    this.api.defaults.headers = this.getDefaultHeaders();

    const { data } = await this.api.post<ResponseData<Credentials>>(
      `/${this.controllerName}/logout`
    );

    return data;
  }

  async forgot(email: string): Promise<ResponseData<string>> {
    this.api.defaults.headers = this.getDefaultHeaders();
    const { data } = await this.api.post<ResponseData<string>>(
      `/emailauth/reset`,
      { email }
    );
    return data;
  }

  async reset(
    token: string,
    password: string
  ): Promise<ResponseData<Credentials>> {
    this.api.defaults.headers = this.getDefaultHeaders();
    const { data } = await this.api.post<ResponseData<Credentials>>(
      `/emailauth/reset`,
      {
        token,
        password,
      }
    );
    return data;
  }

  async exchange(token: string): Promise<ResponseData<Credentials>> {
    this.api.defaults.headers = this.getDefaultHeaders();

    const { data } = await this.api.post<ResponseData<Credentials>>(
      `/${this.controllerName}/exchange`,
      undefined,
      {
        headers: {
          ...BASE_HEADERS,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  }

  async resendConfirm(email: string): Promise<string> {
    this.api.defaults.headers = this.getDefaultHeaders();

    const { data } = await this.api.post<string>(`/emailauth/resendconfirm`, {
      email,
    });

    return data;
  }

  async registerEmailUser(
    name: string,
    email: string,
    password: string,
    locale?: string,
    timezone?: string
  ): Promise<string> {
    this.api.defaults.headers = this.getDefaultHeaders();

    const { data } = await this.api.post<string>(`/emailauth/register`, {
      name,
      email,
      password,
      locale,
      timezone,
    });

    return data;
  }
}

export const authService = new AuthService();
