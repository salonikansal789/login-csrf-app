export interface Iconfig{
    port : number | string;
    mongoURI : string;
    jwtSecret : string;
    jwtExpiresIn : string;
    cookieName : string;
    csrfCookieName : string;
    nodeEnv:string
}