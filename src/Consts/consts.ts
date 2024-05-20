import { TTopics, TVoices } from "../Types/Types";

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

export const voicesArray: TVoices[] = [
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
// LS = local storage
export const LS_TOKEN_KEY = "token";
export const LS_THEME_KEY = "theme";
export const LS_PLAYBACK_SPEED_KEY = "playBackSpeed";
export const LS_ALL_EPISODES_OPEN_KEY = "allEpisodesOpen";

// UI consts
export const DELETE_ERROR_TIMEOUT = 2.5 * 1000;
export const VOICE_SAMPLE_SKELETON_WIDTH = "100%";
export const VOICE_SAMPLE_SKELETON_HEIGHT = 40;
export const SECTION_PY = { xs: 8, sm: 10 };
export const SECTION_GAP = { xs: 3, sm: 6 };
export const DEFAULT_AUTO_HIDE_DURATION = 6 * 1000;
export const HEADER_HEIGHT = 64;
export const BOTTOM_PLAYER_HEIGHT_DESKTOP = 90;
export const BOTTOM_PLAYER_HEIGHT_MOBILE = 120;
export const PRIMARY_COLOR_RGBA = "rgba(0, 113, 227,1)";
export const PRIMARY_COLOR_RGBA_BORDER = "rgba(0, 113, 227,0.5)";

// React query consts
export const EPISODE_EXAMPLE_QUERY_KEY = "episode-example-url";
export const ALL_EPISODES_QUERY_KEY = "all-episodes";
export const ALL_USERS_QUERY_KEY = "all-users";
export const SUPPORT_MESSAGES_QUERY_KEY = "support-messages";
export const VOICES_SAMPLES_QUERY_KEY = "voices-samples";
export const DEFAULT_QUERY_DATA_STALE_TIME_MINUTES = 10;
