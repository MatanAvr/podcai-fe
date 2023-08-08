import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL, GET_EPISODE_URL, LOGIN_URL, episodesResponse } from '../ConstAndTypes/consts';
import { loginRequest, loginResponse } from "../ConstAndTypes/consts";


export class ApiClient {
  private readonly axiosInstance: AxiosInstance = axios.create({
    baseURL:BASE_URL,
    headers: {
      'Content-Type': 'application/json', // You can adjust headers as needed
    },
  });

  async userLogin(loginReq: loginRequest): Promise<loginResponse> {
    try {
      const response: AxiosResponse<loginResponse> = await this.axiosInstance.post(LOGIN_URL, loginReq);
      if(response.data.access_token){
        this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;
      }
      return response.data;
    } catch (error) {
      console.log('userLogin, error:', error)
      throw error;
    }
  }

  async getEpisodes(): Promise<episodesResponse> {
    try {
      const response: AxiosResponse<episodesResponse> = await this.axiosInstance.post(GET_EPISODE_URL, {});
      return response.data;
    } catch (error) {
      console.warn(`getEpisode error`)
      return {urls:[]}
    }
  }
}