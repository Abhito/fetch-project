import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export class HttpService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://frontend-take-home-service.fetch.com',
    });
    this.api.interceptors.response.use(this.handleResponse);
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    //Comment this out if you don't want logs.
    console.info(
      `HTTP Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.baseURL}${
        response.config.url
      }`,
    );
    return response;
  }

  addErrorListener(response: (error: AxiosError) => Promise<AxiosError>) {
    this.api.interceptors.response.use(undefined, response);
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.api.get(url, { withCredentials: true, ...config });
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.api.post(url, data, { withCredentials: true, ...config });
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.api.put(url, data, { withCredentials: true, ...config });
  }

  async patch<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.api.patch(url, data, {
      withCredentials: true,
      ...config,
    });
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.api.delete(url, { withCredentials: true, ...config });
  }
}
