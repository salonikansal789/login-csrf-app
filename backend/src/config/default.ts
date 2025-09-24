import { Iconfig } from "../interface/config.interface";
import dotenv from "dotenv";
dotenv.config();
const config: Iconfig={
    port : process.env.PORT || 4000,
    mongoURI : process.env.MONGO_URI || "",
    jwtSecret : process.env.JWT_SECRET || '',
    jwtExpiresIn :  process.env.JWT_EXPIRES_IN ||'1h',
    cookieName :process.env.COOKIE_NAME || '',
    csrfCookieName :process.env.CSRF_COOKIE_NAME || '',
    nodeEnv : process.env.NODE_ENV || 'development'
}

export default config
