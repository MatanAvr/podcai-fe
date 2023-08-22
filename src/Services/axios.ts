import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import {
  USER_AUTH_URL,
  BASE_URL,
  GET_EPISODES_URL,
  GET_PODCASTS_URL,
  GET_VOICE_SAMPLES_URL,
  USER_LOGIN_URL,
  SIGNUP_URL,
  getEpisodesResponse,
  getPodcastsResponse,
  getVoiceSamplesResponse,
  signUpRequest,
  signUpResponse,
  updateUserResponse,
  updateUserRequest,
  USER_UPDATE_URL,
  sendOtpRequest,
  sendOtpResponse,
  SEND_OTP_URL,
  verifyOtpRequest,
  verifyOtpResponse,
  VERIFY_OTP_URL,
} from "../ConstAndTypes/consts";
import { loginRequest, loginResponse } from "../ConstAndTypes/consts";

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    // Private constructor to prevent external instantiation.
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  setToken(token: string) {
    this.axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  removeToken() {
    delete this.axiosInstance.defaults.headers.common["Authorization"];
  }

  handleAxiosError(error: AxiosError) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log("Response Status:", error.response.status);
      console.log("Response Data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Request made but no response received");
    } else {
      // Something happened in setting up the request that triggered an error
      console.log("Error:", error.message);
    }
  }

  async userLogin(loginReq: loginRequest): Promise<loginResponse> {
    try {
      const response: AxiosResponse<loginResponse> =
        await this.axiosInstance.post(USER_LOGIN_URL, loginReq);
      return response.data;
    } catch (error) {
      console.log("userLogin, error:", error);
      this.handleAxiosError(error as AxiosError);
      throw error;
    }
  }

  async userAuth(): Promise<loginResponse> {
    try {
      const response: AxiosResponse<loginResponse> =
        await this.axiosInstance.get(USER_AUTH_URL);
      return response.data;
    } catch (error) {
      console.log("auth, error:", error);
      throw error;
    }
  }

  async userUpdate(
    userToUpdate: updateUserRequest
  ): Promise<updateUserResponse> {
    try {
      const response: AxiosResponse<updateUserResponse> =
        await this.axiosInstance.post(USER_UPDATE_URL, userToUpdate);
      return response.data;
    } catch (error) {
      console.log("userUpdate, error:", error);
      throw error;
    }
  }

  async signUp(newUser: signUpRequest): Promise<signUpResponse> {
    try {
      const response: AxiosResponse<signUpResponse> =
        await this.axiosInstance.post(SIGNUP_URL, newUser);
      if (response.data.access_token) {
        this.axiosInstance.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
      }
      return response.data;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
      console.error(error);
      throw error;
    }
  }

  async getPodcasts(): Promise<getPodcastsResponse> {
    try {
      const response: AxiosResponse<getPodcastsResponse> =
        await this.axiosInstance.get(GET_PODCASTS_URL);
      return response.data;
    } catch (error) {
      console.warn(`getPodcasts error`);
      return { urls: [] };
    }
  }

  async getEpisodes(): Promise<getEpisodesResponse> {
    try {
      const response: AxiosResponse<getEpisodesResponse> =
        await this.axiosInstance.get(GET_EPISODES_URL);
      return response.data;
    } catch (error) {
      console.warn(`getEpisodes error`);
      return { episodes: [] };
    }
  }

  async getVoiceSamples(): Promise<getVoiceSamplesResponse> {
    try {
      const response: AxiosResponse<getVoiceSamplesResponse> =
        await this.axiosInstance.get(GET_VOICE_SAMPLES_URL);
      return response.data;
    } catch (error) {
      console.warn(`getVoiceSamples error`);
      return { voice_samples: [] };
    }
  }

  async sendOtp(sendOtpReq: sendOtpRequest): Promise<sendOtpResponse> {
    try {
      const response: AxiosResponse<sendOtpResponse> =
        await this.axiosInstance.post(SEND_OTP_URL, sendOtpReq);
      return response.data;
    } catch (error) {
      console.log("sendOtp, error:", error);
      throw error;
    }
  }

  async verifyOtp(verifyOtpReq: verifyOtpRequest): Promise<verifyOtpResponse> {
    try {
      const response: AxiosResponse<verifyOtpResponse> =
        await this.axiosInstance.post(VERIFY_OTP_URL, verifyOtpReq);
      return response.data;
    } catch (error) {
      console.log("verifyOtp, error:", error);
      throw error;
    }
  }
}
