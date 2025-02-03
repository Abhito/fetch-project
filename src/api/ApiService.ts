import { HttpService } from './HttpService.ts';
import {
  Dog,
  DogSearchInput,
  DogSearchResponse,
} from '../components/DogImageItem/DogImageItem.interface.ts';
import { AxiosError } from 'axios';

class apiService {
  private static instance: apiService;
  private readonly httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  static getInstance(): apiService {
    if (!apiService.instance) {
      apiService.instance = new apiService();
    }
    return apiService.instance;
  }

  addErrorResponse(response: (error: AxiosError) => Promise<AxiosError>) {
    this.httpService.addErrorListener(response);
  }

  async loginUser(credentials: { name: string; email: string }) {
    return await this.httpService.post('/auth/login', credentials);
  }

  async logoutUser() {
    return await this.httpService.post('/auth/login', {});
  }

  async searchDogs(search: DogSearchInput) {
    return await this.httpService.get<DogSearchResponse>('/dogs/search', {
      params: search,
    });
  }

  async getDogs(ids: string[]) {
    return await this.httpService.post<Dog[]>('/dogs', ids);
  }

  async getDogBreeds() {
    return await this.httpService.get<string[]>('/dogs/breeds');
  }

  async getMatch(ids: string[]) {
    return await this.httpService.post<{ match: string }>('/dogs/match', ids);
  }
}

export const ApiService = apiService.getInstance();
