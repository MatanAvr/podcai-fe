export type Pages = 'ComingSoon' | 'Team' | 'About' | 'Features' | 'Login' | 'SignUp'
export type mainCategories ='general' | 'world' | 'nation' | 'business' | 'technology' |
 'entertainment' | 'sports' | 'science' | 'health'

 export type loginRequest = {email:string, password:string}
 export type loginResponse = {access_token:String}
 export type episodesResponse = {urls:string[]}
 

 export const BASE_URL:string = 'http://ec2-3-95-218-92.compute-1.amazonaws.com:5002/api'
 export const LOGIN_URL = '/user/login' 
 export const GET_EPISODE_URL = '/user/get_podcasts/' 