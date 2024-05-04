import { SuscirptionEnum, RoleEnum } from "../Enums/Enums";

export type TPages =
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

export type TVoices =
  | "Guy"
  | "Aria"
  | "Andrew"
  | "Jason"
  | "Nancy"
  | "Michelle";

export type TSubscription =
  | SuscirptionEnum.Basic
  | SuscirptionEnum.Standard
  | SuscirptionEnum.Premium
  | SuscirptionEnum.PayAsYouGo;

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

export type TCountries = "us";
export type TLanguages = "en";

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

export type TPlaySpeedOptions = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

export type TConfig = {
  allEpisodesOpen: boolean;
  playbackSpeed: TPlaySpeedOptions;
};
