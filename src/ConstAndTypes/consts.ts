export interface INewUser  {
    name:string
    email:string
    password:string
    voice: Voices
    num_of_articles:number
    categories: Categories[]
    country: Countries
    language: Languages
}

export type Pages = 'ComingSoon' | 'Team' | 'About' | 'Features' | 'Login' | 'SignUp' | 'Home'
export type Categories ='general' | 'world' | 'nation' | 'business' | 'technology' |
 'entertainment' | 'sports' | 'science' | 'health'
type Countries = "au"|"br"|"ca"|"cn"|"eg"|"fr"|"de"|"gr"|"hk"|"in"|"ie"|"il"|"it"|"jp"|"nl"|"no"|"pk"|"pe"|"ph"|"pt"|"ro"|"ru"|"sg"|"es"|"se"|"ch"|"tw"|"ua"|"gb"|"us"
type Languages = "ar"|"zh"|"nl"|"en"|"fr"|"de"|"el"|"he"|"hi"|"it"|"ja"|"ml"|"mr"|"no"|"pt"|"ro"|"ru"|"es"|"sv"|"ta"|"te"|"uk"
type Voices = 'Guy' | 'Aria'

// API  related
export const BASE_URL:string = 'https://www.podcai.co/api'

export const LOGIN_URL = '/user/login/' 
export type loginRequest = {email:string, password:string}
export type loginResponse = {access_token:string}

export const SIGNUP_URL = '/sign_up/' 
export interface signUpRequest extends INewUser {}
export type signUpResponse = {access_token:String}

export const GET_PODCASTS_URL = '/user/get_podcasts/' 
export type getPodcastsResponse = {urls:string[]}

export const GET_EPISODES_URL = '/user/get_episodes/' 
export type getEpisodesResponse = {episodes:Episode[]}

export const GET_VOICE_SAMPLES_URL = '/get_voice_samples/' 
export type getVoiceSamplesResponse = {voice_samples:VoiceSample[]}
export type VoiceSample = {name:string,url:string}

export interface Episode {name:string, link: string, categories:Categories[], articles_data:ArticleData[] }

interface ArticleData {
    title:string
    description:string
    url:string
    publish_at:string
    image:string
    source_name:string
    source_url:string
}
