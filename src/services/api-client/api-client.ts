import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { configuration } from "../configuration";

const DefaultTimeout = 120000;

export class ApiClient {
  private _axiosInstance: AxiosInstance;
  private _baseUrl: string = configuration.lqDataPlatform.apiUrl;
  private _cache: { [url: string]: any } = {};

  constructor() {
    this._axiosInstance = axios.create();
  }

  public withBaseUrl(baseUrl: string) {
    this._baseUrl = baseUrl;
    return this;
  }

  public get baseUrl() {
    return this._baseUrl;
  }

  public async get<TResult>(
    url: string,
    requestConfig?: AxiosRequestConfig
  ): Promise<TResult> {
    return this._manageResponse(async () =>
      this._axiosInstance.get(url, await this._getRequestConfig(requestConfig))
    );
  }

  public async getWithCache<TResult>(
    url: string,
    requestConfig?: AxiosRequestConfig
  ): Promise<TResult> {
    if (this._cache[url]) {
      return this._cache[url];
    }
    const response = await this._manageResponse(async () =>
      this._axiosInstance.get<TResult>(
        url,
        await this._getRequestConfig(requestConfig)
      )
    );
    this._cache[url] = response;
    return response;
  }

  public async post<TData, TResult>(
    url: string,
    data: TData,
    requestConfig?: AxiosRequestConfig
  ): Promise<TResult> {
    return this._manageResponse(async () =>
      this._axiosInstance.post(
        url,
        data,
        await this._getRequestConfig(requestConfig)
      )
    );
  }

  public async put<TData, TResult>(
    url: string,
    data: TData,
    requestConfig?: AxiosRequestConfig
  ): Promise<TResult> {
    return this._manageResponse(async () =>
      this._axiosInstance.put(
        url,
        data,
        await this._getRequestConfig(requestConfig)
      )
    );
  }

  public async delete<TResult>(
    url: string,
    requestConfig?: AxiosRequestConfig
  ): Promise<TResult> {
    return this._manageResponse(async () =>
      this._axiosInstance.delete(
        url,
        await this._getRequestConfig(requestConfig)
      )
    );
  }

  protected onError(error: Error) {
    console.error(error);
  }

  private async _manageResponse<T>(
    fn: () => Promise<AxiosResponse<T>>
  ): Promise<T> {
    try {
      const response = await fn();
      return response.data;
    } catch (error: any) {
      this.onError(error);
      throw error;
    }
  }

  private async _getRequestConfig(
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    const defaultConfig = await this._getDefaultRequestConfig();

    if (!requestConfig) {
      return defaultConfig;
    }

    const customHeaders = {
      ...defaultConfig?.headers,
      ...requestConfig.headers,
    };
    const customConfig = {
      ...defaultConfig,
      ...requestConfig,
      headers: customHeaders,
    };
    return customConfig;
  }

  protected async _getDefaultRequestConfig(): Promise<AxiosRequestConfig> {
    return {
      timeout: DefaultTimeout,
      baseURL: this._baseUrl,
    };
  }
}
