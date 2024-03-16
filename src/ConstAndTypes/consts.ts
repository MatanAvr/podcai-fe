export interface INewUser {
  name: string;
  email: string;
  password: string;
  voice: Voices;
  num_of_articles: number;
  categories: Categories[];
  country: Countries;
  language: Languages;
  should_send_episode_email: boolean;
}

export type loggedInUser = Omit<INewUser, "num_of_articles" | "password">;

export type Pages =
  | "Login"
  | "Sign up"
  | "Home"
  | "Settings"
  | "LandingPage"
  | "Unsubscribe";

export type Categories =
  | "general"
  | "world"
  | "nation"
  | "business"
  | "technology"
  | "entertainment"
  | "sports"
  | "science"
  | "health";

type Countries =
  | "au"
  | "br"
  | "ca"
  | "cn"
  | "eg"
  | "fr"
  | "de"
  | "gr"
  | "hk"
  | "in"
  | "ie"
  | "il"
  | "it"
  | "jp"
  | "nl"
  | "no"
  | "pk"
  | "pe"
  | "ph"
  | "pt"
  | "ro"
  | "ru"
  | "sg"
  | "es"
  | "se"
  | "ch"
  | "tw"
  | "ua"
  | "gb"
  | "us";

type Languages =
  | "ar"
  | "zh"
  | "nl"
  | "en"
  | "fr"
  | "de"
  | "el"
  | "he"
  | "hi"
  | "it"
  | "ja"
  | "ml"
  | "mr"
  | "no"
  | "pt"
  | "ro"
  | "ru"
  | "es"
  | "sv"
  | "ta"
  | "te"
  | "uk";

export type Voices = "Guy" | "Aria";

export const deleteErrorTimeout = 2500;

// API  related
export const BASE_URL: string = "https://www.podcai.co/api";
export const USER_LOGIN_URL = "/user/login/";
export const USER_AUTH_URL = "/user/auth/";
export type loginRequest = { email: string; password: string };
export interface loginResponse {
  access_token: string;
  name: string;
  email: string;
  categories: Categories[];
  voice: Voices;
  country: Countries;
  language: Languages;
  should_send_episode_email: boolean;
}

export const SIGNUP_URL = "/sign_up/";
export interface signUpRequest extends INewUser {}
export interface signUpResponse extends loginResponse {}
export const USER_UPDATE_URL = "/user/update_user/";
export type updateUserRequest = {
  name: string;
  num_of_articles: number;
  categories: Categories[];
  country: Countries;
  language: Languages;
  voice: Voices;
};
export type updateUserResponse = {
  is_success: boolean;
};

export const GET_PODCASTS_URL = "/user/get_podcasts/";
export type getPodcastsResponse = { urls: string[] };

export const GET_EPISODES_URL = "/user/get_episodes/";
export type getEpisodesResponse = { episodes: Episode[] };

export const GET_VOICE_SAMPLES_URL = "/get_voice_samples/";
export type getVoiceSamplesResponse = { voice_samples: VoiceSample[] };
export type VoiceSample = { name: Voices; url: string };

export interface Episode {
  name: string;
  link: string;
  categories: Categories[];
  articles_data: ArticleData[];
}

export interface ArticleData {
  title: string;
  description: string;
  url: string;
  publish_at: string;
  image: string;
  source_name: string;
  source_url: string;
}

type sendMethods = "EMAIL";

export const SEND_OTP_URL = "/send_otp/";
export type sendOtpRequest = {
  name: string;
  send_to: string;
  method: sendMethods;
};
export type sendOtpResponse = {
  is_success: boolean;
};

export const VERIFY_OTP_URL = "/verify_otp/";
export type verifyOtpRequest = {
  send_to: string;
  otp: string;
};
export type verifyOtpResponse = {
  is_success: boolean;
};

export const MIN_NAME_LENGTH = 2;
export const OTP_LENGTH = 6;
export const MIN_PASS_LENGTH = 4;
export const NUM_OF_CATEGORIES = 3;

export interface CustomAxiosError {
  detail: string;
}

export const UNSUBSCRIBE_URL = "/unsubscribe/";
export type unsubscribeRequest = {
  email: string;
};
export type unsubscribeResponse = {
  is_success: boolean;
};

export const DELETE_USER_URL = "/user/delete_user/";
export type deleteUserReqeust = {
  password: string;
};
export type deleteUserResponse = {
  is_success: boolean;
};
