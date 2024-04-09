export interface INewUser {
  name: string;
  email: string;
  password: string;
  voice: Voices;
  num_of_articles: number;
  categories: Topics[];
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
  | "Unsubscribe"
  | "Forgot password"
  | "Terms of service"
  | "Privacy policy"
  | "Contact us"
  | "Updates"
  | "";

type Countries = "us";
type Languages = "en";

export type Topics =
  | "general"
  | "world"
  | "nation"
  | "business"
  | "health"
  | "technology"
  | "sports"
  | "science"
  | "entertainment";

export const topicsArray: Topics[] = [
  "general",
  "world",
  "nation",
  "business",
  "health",
  "technology",
  "sports",
  "science",
  "entertainment",
];

export type Voices = "Guy" | "Aria" | "Andrew" | "Jason" | "Nancy" | "Michelle";
export const voicesArray = [
  "Guy",
  "Aria",
  "Andrew",
  "Jason",
  "Nancy",
  "Michelle",
];
// User and system consts
export const MIN_NAME_LENGTH = 2;
export const OTP_LENGTH = 6;
export const MIN_PASS_LENGTH = 4;
export const MAX_NUM_OF_TOPICS = 3;
export const MIN_NUM_OF_TOPICS = 1;
export const SUPPORT_EMAIL = "support@podcai.co";
export type Subscription = "Basic" | "Standard" | "Premium";

// UI consts
export const DELETE_ERROR_TIMEOUT = 2.5 * 1000;
export const VOICE_SAMPLE_SKELETON_WIDTH = "100%";
export const VOICE_SAMPLE_SKELETON_HEIGHT = 42;
export const LANDING_PAGE_PY = { xs: 8, sm: 10 };
export const DEFAULT_AUTO_HIDE_DURATION = 6 * 1000;

// React query consts
export const EPISODE_EXAMPLE_QUERY_KEY = "episode-example-url";
export const ALL_EPISODES_QUERY_KEY = "all-episodes";
export const VOICES_SAMPLES_QUERY_KEY = "voices-samples";
export const DEFAULT_STALE_TIME_MINUTES = 10;

// API  related
export const BASE_URL: string = "https://www.podcai.co/api";
export const USER_LOGIN_URL = "/user/login/";
export const USER_AUTH_URL = "/user/auth/";
export type loginRequest = { email: string; password: string };
export interface loginResponse {
  access_token: string;
  name: string;
  email: string;
  categories: Topics[];
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
  categories: Topics[];
  country: Countries;
  language: Languages;
  voice: Voices;
};
export type updateUserResponse = {
  is_success: boolean;
};

export const GET_EPISODES_URL = "/user/get_episodes/";
export type getEpisodesResponse = { episodes: Episode[] };

export const GET_VOICE_SAMPLES_URL = "/get_voice_samples/";
export type getVoiceSamplesResponse = { voice_samples: VoiceSample[] };
export type VoiceSample = { name: Voices; url: string };

export interface Episode {
  name: string;
  link: string;
  categories: Topics[];
  articles_data: ArticleData[];
  is_completed: boolean;
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

type sendOtpMethods = "EMAIL";
type sendOtpReason = "SIGN_UP" | "PASSWORD";

export const SEND_OTP_URL = "/send_otp/";
export type sendOtpRequest = {
  name: string;
  send_to: string;
  method: sendOtpMethods;
  otp_reason: sendOtpReason;
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

export const UPDATE_PASSWORD_URL = "/update_password/";
export type updatePasswordRequest = {
  email: string;
  new_password: string;
};
export type updatePasswordResponse = {
  is_success: boolean;
};

export const SEND_SUPPORT_MESSAGE_URL = "/send_support_message/";
export type sendSupportMessageRequest = {
  email: string;
  subject: string;
  message: string;
};
export type sendSupportMessageResponse = {
  is_success: boolean;
};

export const GET_EPISODE_EXAMPLE_URL = "/get_episode_example/";

export type GetEpisodeExampleResponse = {
  url: string;
};

export const EPISODE_COMPLETED_URL = "/user/episode_completed/";

export type EpisodeCompletedRequest = {
  episode_name: string;
};
export type EpisodeCompletedResponse = {
  is_success: boolean;
};

export const GOOGLE_OAUTH_URL =
  "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";

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
