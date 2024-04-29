import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  USER_AUTH_URL,
  BASE_URL,
  GET_EPISODES_URL,
  GET_VOICE_SAMPLES_URL,
  USER_LOGIN_URL,
  SIGNUP_URL,
  USER_UPDATE_URL,
  VERIFY_OTP_URL,
  SEND_OTP_URL,
  getEpisodesResponse,
  getVoiceSamplesResponse,
  signUpRequest,
  signUpResponse,
  updateUserResponse,
  updateUserRequest,
  sendOtpRequest,
  sendOtpResponse,
  verifyOtpRequest,
  verifyOtpResponse,
  unsubscribeRequest,
  unsubscribeResponse,
  UNSUBSCRIBE_URL,
  deleteUserReqeust,
  deleteUserResponse,
  DELETE_USER_URL,
  UPDATE_PASSWORD_URL,
  updatePasswordRequest,
  updatePasswordResponse,
  sendSupportMessageRequest,
  sendSupportMessageResponse,
  SEND_SUPPORT_MESSAGE_URL,
  GetEpisodeExampleResponse,
  GET_EPISODE_EXAMPLE_URL,
  EpisodeCompletedRequest,
  EpisodeCompletedResponse,
  EPISODE_COMPLETED_URL,
  GOOGLE_OAUTH_URL,
  GoogleUserResponse,
  loginRequest,
  loginResponse,
  getAllUsersResponse,
  GET_ALL_USERS_URL,
  GET_ALL_USER_EPISODES_URL,
  getAllUserEpisodesResponse,
} from "../ConstAndTypes/ApiTypesAndConsts";

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

  async userLogin(loginReq: loginRequest): Promise<loginResponse> {
    try {
      const response: AxiosResponse<loginResponse> =
        await this.axiosInstance.post(USER_LOGIN_URL, loginReq);
      return response.data;
    } catch (error) {
      console.error(`userLogin, error:${error}`);
      throw error;
    }
  }

  async userAuth(): Promise<loginResponse> {
    try {
      const response: AxiosResponse<loginResponse> =
        await this.axiosInstance.get(USER_AUTH_URL);
      return response.data;
    } catch (error) {
      console.error(`userAuth, error:${error}`);
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
      console.error(`userUpdate, error:${error}`);
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
      console.error(`signUp, error:${error}`);
      throw error;
    }
  }

  async getEpisodes(): Promise<getEpisodesResponse> {
    try {
      const response: AxiosResponse<getEpisodesResponse> =
        await this.axiosInstance.get(GET_EPISODES_URL);
      return response.data;
    } catch (error) {
      console.error(`getEpisodes, error:${error}`);
      return { episodes: [] };
    }
  }

  async getVoiceSamples(): Promise<getVoiceSamplesResponse> {
    try {
      const response: AxiosResponse<getVoiceSamplesResponse> =
        await this.axiosInstance.get(GET_VOICE_SAMPLES_URL);
      return response.data;
    } catch (error) {
      console.error(`getVoiceSamples, error:${error}`);
      return { voice_samples: [] };
    }
  }

  async sendOtp(sendOtpReq: sendOtpRequest): Promise<sendOtpResponse> {
    try {
      const response: AxiosResponse<sendOtpResponse> =
        await this.axiosInstance.post(SEND_OTP_URL, sendOtpReq);
      return response.data;
    } catch (error) {
      console.error(`sendOtp, error:${error}`);
      throw error;
    }
  }

  async verifyOtp(verifyOtpReq: verifyOtpRequest): Promise<verifyOtpResponse> {
    try {
      const response: AxiosResponse<verifyOtpResponse> =
        await this.axiosInstance.post(VERIFY_OTP_URL, verifyOtpReq);
      return response.data;
    } catch (error) {
      console.error(`verifyOtp, error:${error}`);
      throw error;
    }
  }

  async unsubscribe(
    unsubscribeReq: unsubscribeRequest
  ): Promise<unsubscribeResponse> {
    try {
      const response: AxiosResponse<unsubscribeResponse> =
        await this.axiosInstance.post(UNSUBSCRIBE_URL, unsubscribeReq);
      return response.data;
    } catch (error) {
      console.error(`unsubscribe, error:${error}`);
      throw error;
    }
  }

  async deleteUser(
    deleteUserReq: deleteUserReqeust
  ): Promise<deleteUserResponse> {
    try {
      const response: AxiosResponse<deleteUserResponse> =
        await this.axiosInstance.post(DELETE_USER_URL, deleteUserReq);
      return response.data;
    } catch (error) {
      console.error(`deleteUser, error:${error}`);
      throw error;
    }
  }

  async updatePassword(
    updatePasswordReq: updatePasswordRequest
  ): Promise<updatePasswordResponse> {
    try {
      const response: AxiosResponse<updatePasswordResponse> =
        await this.axiosInstance.post(UPDATE_PASSWORD_URL, updatePasswordReq);
      return response.data;
    } catch (error) {
      console.error(`updatePassword, error:${error}`);
      throw error;
    }
  }

  async sendSupportMessage(
    sendSupportMessageReq: sendSupportMessageRequest
  ): Promise<sendSupportMessageResponse> {
    try {
      const response: AxiosResponse<sendSupportMessageResponse> =
        await this.axiosInstance.post(
          SEND_SUPPORT_MESSAGE_URL,
          sendSupportMessageReq
        );
      return response.data;
    } catch (error) {
      console.error(`sendSupportMessage, error:${error}`);
      throw error;
    }
  }

  async getEpisodeExample(): Promise<GetEpisodeExampleResponse> {
    try {
      const response: AxiosResponse<GetEpisodeExampleResponse> =
        await this.axiosInstance.get(GET_EPISODE_EXAMPLE_URL);
      return response.data;
    } catch (error) {
      console.error(`getEpisodeExample, error:${error}`);
      throw error;
    }
  }

  async episodeCompleted(
    episodeCompletedReq: EpisodeCompletedRequest
  ): Promise<EpisodeCompletedResponse> {
    try {
      const response: AxiosResponse<EpisodeCompletedResponse> =
        await this.axiosInstance.post(
          EPISODE_COMPLETED_URL,
          episodeCompletedReq
        );
      return response.data;
    } catch (error) {
      console.error(`episodeCompleted, error:${error}`);
      throw error;
    }
  }

  async getGoogleUser(accessToken: string): Promise<GoogleUserResponse> {
    try {
      const response: AxiosResponse<GoogleUserResponse> =
        await this.axiosInstance.get(`${GOOGLE_OAUTH_URL}${accessToken}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });
      return response.data;
    } catch (error) {
      console.error(`getGoogleUser, error:${error}`);
      throw error;
    }
  }

  async getAllUsers(): Promise<getAllUsersResponse> {
    try {
      const response: AxiosResponse<getAllUsersResponse> =
        await this.axiosInstance.get(GET_ALL_USERS_URL);
      return response.data;
    } catch (error) {
      console.error(`getAllUsers, error:${error}`);
      return { users: [] };
    }
  }

  async getAllUserEpisodes(
    userId: string
  ): Promise<getAllUserEpisodesResponse> {
    try {
      const response: AxiosResponse<getAllUserEpisodesResponse> =
        await this.axiosInstance.get(
          `${GET_ALL_USER_EPISODES_URL}?user_id=${userId}`
        );
      return response.data;
    } catch (error) {
      console.error(`getAllUserEpisodes, error:${error}`);
      return { episodes_data: [] };
    }
  }
}
