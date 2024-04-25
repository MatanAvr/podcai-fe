export enum SuscirptionEnum {
  Basic = "Basic",
  Standard = "Standard",
  Premium = "Premium",
  PayAsYouGo = "PayAsYouGo",
}

export type TSubscription =
  | SuscirptionEnum.Basic
  | SuscirptionEnum.Standard
  | SuscirptionEnum.Premium
  | SuscirptionEnum.PayAsYouGo;

export enum RoleEnum {
  User = "User",
  Admin = "Admin",
  Test = "Test",
}

export type TRole = RoleEnum.User | RoleEnum.Admin | RoleEnum.Test;

export interface INewUser {
  name: string;
  email: string;
  password: string;
  voice: TVoices;
  num_of_articles: number;
  categories: TTopics[];
  country: TCountries;
  language: TLanguages;
  should_send_episode_email: boolean;
  subscription: TSubscription;
  profile_pic: string | null;
  role: TRole;
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
  | "Admin dashboard"
  | "";

type TCountries = "us";
type TLanguages = "en";

export type TTopics =
  | "general"
  | "world"
  | "nation"
  | "business"
  | "health"
  | "technology"
  | "sports"
  | "science"
  | "entertainment";

export const topicsArray: TTopics[] = [
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

export type TVoices =
  | "Guy"
  | "Aria"
  | "Andrew"
  | "Jason"
  | "Nancy"
  | "Michelle";
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
export const LOCAL_STORAGE_TOKEN_KEY = "token";
export const LOCAL_STORAGE_THEME_KEY = "theme";

// UI consts
export const DELETE_ERROR_TIMEOUT = 2.5 * 1000;
export const VOICE_SAMPLE_SKELETON_WIDTH = "100%";
export const VOICE_SAMPLE_SKELETON_HEIGHT = 40;
export const LANDING_PAGE_PY = { xs: 8, sm: 10 };
export const DEFAULT_AUTO_HIDE_DURATION = 6 * 1000;

// React query consts
export const EPISODE_EXAMPLE_QUERY_KEY = "episode-example-url";
export const ALL_EPISODES_QUERY_KEY = "all-episodes";
export const ALL_USERS_QUERY_KEY = "all-users";
export const VOICES_SAMPLES_QUERY_KEY = "voices-samples";
export const DEFAULT_QUERY_DATA_STALE_TIME_MINUTES = 10;

// API  related
export const BASE_URL: string = "https://www.podcai.co/api";
export const USER_LOGIN_URL = "/user/login/";
export const USER_AUTH_URL = "/user/auth/";
export type loginRequest = { email: string; password: string };
export interface loginResponse extends loggedInUser {
  access_token: string;
}

export const SIGNUP_URL = "/sign_up/";
export interface signUpRequest extends INewUser {}
export interface signUpResponse extends loginResponse {}
export const USER_UPDATE_URL = "/user/update_user/";
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

export const GET_EPISODES_URL = "/user/get_episodes/";
export type getEpisodesResponse = { episodes: TEpisode[] };

export const GET_VOICE_SAMPLES_URL = "/get_voice_samples/";
export type getVoiceSamplesResponse = { voice_samples: VoiceSample[] };
export type VoiceSample = { name: TVoices; url: string };

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

enum StageEnum {
  Alpha = "alpha",
  Beta = "beta",
  Release = "release",
}

type TStage = StageEnum.Alpha | StageEnum.Beta | StageEnum.Release;

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

export const GET_ALL_USERS_URL = "/admin/get_all_users/";
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
export const GET_ALL_USER_EPISODES_URL = "/admin/get_all_user_episodes/";
export type getAllUserEpisodesResponse = {
  episodes_data: TEpisodeDB[];
};
