import { StageEnum } from "../Enums/Enums";
import {
  loggedInUser,
  INewUser,
  TTopics,
  TCountries,
  TLanguages,
  TVoices,
  TSubscription,
  TRole,
} from "../Types/Types";

// URLS
// GENERAL
export const BASE_URL: string = "https://www.podcai.co/api";
export const SIGNUP_URL = "/sign_up/";
export const GET_VOICE_SAMPLES_URL = "/get_voice_samples/";
export const SEND_OTP_URL = "/send_otp/";
export const VERIFY_OTP_URL = "/verify_otp/";
export const UNSUBSCRIBE_URL = "/unsubscribe/";
export const GET_EPISODE_EXAMPLE_URL = "/get_episode_example/";
export const SEND_SUPPORT_MESSAGE_URL = "/send_support_message/";
export const UPDATE_PASSWORD_URL = "/update_password/";
// USER
export const USER_LOGIN_URL = "/user/login/";
export const USER_AUTH_URL = "/user/auth/";
export const USER_UPDATE_URL = "/user/update_user/";
export const GET_EPISODES_URL = "/user/get_episodes/";
export const DELETE_USER_URL = "/user/delete_user/";
export const EPISODE_COMPLETED_URL = "/user/episode_completed/";
export const UPDATE_EPISODE_PROGRESS_URL = "/user/update_episode_progress/";
// ADMIN
export const GET_ALL_USERS_URL = "/admin/get_all_users/";
export const GET_ALL_USER_EPISODES_URL = "/admin/get_all_user_episodes/";
// OTHER
export const GOOGLE_OAUTH_URL =
  "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

export type loginRequest = { email: string; password: string };
export interface loginResponse extends loggedInUser {
  access_token: string;
}

export interface signUpRequest extends INewUser {}
export interface signUpResponse extends loginResponse {}
export type updateUserRequest = {
  name: string;
  num_of_articles: number;
  categories: TTopics[];
  country: TCountries;
  language: TLanguages;
  voice: TVoices;
};
export type updateUserResponse = {
  is_success: boolean;
};

export type getEpisodesResponse = { episodes: TEpisode[] };
export type getVoiceSamplesResponse = { voice_samples: TVoiceSample[] };
export type TVoiceSample = { name: TVoices; url: string };
export type TEpisode = {
  name: string;
  link: string;
  categories: TTopics[];
  articles_data: ArticleData[];
  is_completed: boolean;
};

export interface ArticleData {
  title: string;
  description: string;
  url: string;
  publish_at: string;
  image: string;
  source_name: string;
  source_url: string;
}

type sendOtpMethods = "EMAIL";
type sendOtpReason = "SIGN_UP" | "PASSWORD";

export type sendOtpRequest = {
  name: string;
  send_to: string;
  method: sendOtpMethods;
  otp_reason: sendOtpReason;
};
export type sendOtpResponse = {
  is_success: boolean;
};

export type verifyOtpRequest = {
  send_to: string;
  otp: string;
};
export type verifyOtpResponse = {
  is_success: boolean;
};

export type unsubscribeRequest = {
  email: string;
};
export type unsubscribeResponse = {
  is_success: boolean;
};

export type deleteUserReqeust = {
  password: string;
};
export type deleteUserResponse = {
  is_success: boolean;
};

export type updatePasswordRequest = {
  email: string;
  new_password: string;
};
export type updatePasswordResponse = {
  is_success: boolean;
};

export type sendSupportMessageRequest = {
  email: string;
  subject: string;
  message: string;
};
export type sendSupportMessageResponse = {
  is_success: boolean;
};

export type GetEpisodeExampleResponse = {
  url: string;
};

export type EpisodeCompletedRequest = {
  episode_name: string;
};
export type EpisodeCompletedResponse = {
  is_success: boolean;
};

export type GoogleUserResponse = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

export type TStage = StageEnum.Alpha | StageEnum.Beta | StageEnum.Release;

export type TUserFromDB = {
  user_id: string;
  name: string;
  email: string;
  password: string;
  num_of_articles: number;
  categories: TTopics[];
  country: TCountries[];
  language: TLanguages;
  salt: string;
  voice: TVoices;
  should_create_episode: boolean;
  should_send_episode_email: boolean;
  last_login: string;
  subscription: TSubscription;
  role: TRole;
  stage: TStage;
  login_with: string;
  profile_pic: string;
};

export type getAllUsersResponse = {
  users: TUserFromDB[];
};

type TEpisodeDB = {
  user_id: string;
  episode_name: string;
  link: string;
  articles_data: ArticleData[];
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  chat_gpt_summary: string;
  file_size: number;
  lambda_run_time: number;
  num_of_articles: number;
  categories: TTopics[];
  voice: TVoices[];
  country: TCountries;
  language: TLanguages;
  is_completed: boolean;
  engine: string;
  engine_model: string;
};
export type getAllUserEpisodesResponse = {
  episodes_data: TEpisodeDB[];
};

export type UpdateRpisodeProgressRequest = {
  progress: number;
  episode_name: string;
};
export type UpdateRpisodeProgressResponse = {
  is_success: boolean;
};
