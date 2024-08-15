import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from '../config';

enum StatusCode {
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

class Http {
  private readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    this._initializeInterceptors();
  }

  private _initializeInterceptors() {
    this.instance.interceptors.request.use(this._handleRequest, this._handleRequestError);
    this.instance.interceptors.response.use(this._handleResponse, this._handleResponseError.bind(this));
  }

  private _handleRequest(this: void, config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    // --Optionally add authorization header

    // const authStore = useAuthStore();
    // if (authStore.token != null && config.headers)
    //   config.headers.Authorization = `Bearer ${authStore.token}`;

    // --Optionally add locale header

    // const localeStore = useLocaleStore();
    // if (config.headers)
    //   config.headers['Content-Language'] = localeStore.locale;

    return config;
  }

  private _handleRequestError = (error: AxiosError) => Promise.reject(error);
  private _handleResponse = (response: AxiosResponse) => response;
  private _handleResponseError(error: AxiosError) {
    const { response } = error;

    if (response)
      this.handleError(response.status);

    return Promise.reject(error);
  }

  // Handle global app errors
  protected handleError(status: AxiosResponse['status']) {
    switch (status) {
      case StatusCode.InternalServerError: {
        break;
      }
      case StatusCode.Forbidden: {
        break;
      }
      case StatusCode.Unauthorized: {
        // Unauthorized logic
        break;
      }
      case StatusCode.TooManyRequests: {
        break;
      }
    }
  }

  private _baseRequest(config: AxiosRequestConfig) {
    // Do logic with base request
    return this.instance.request(config);
  }

  request(config: AxiosRequestConfig) {
    return this._baseRequest(config);
  }
}

export const http = new Http(BASE_URL);
