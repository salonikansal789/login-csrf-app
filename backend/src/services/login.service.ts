import { UserModel } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../config/default";
class LoginService {

login= async (email: string, password: string): Promise<string> => {
  if (!email || !password) {
    const err: any = new Error('Email and password are required');
    err.status = 400;
    throw err;
  }

  const user = await UserModel.findOne({ email }).lean();
  if (!user) {
    const err: any = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, (user as any).password);
  if (!match) {
    const err: any = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    config.jwtSecret,
    { expiresIn: +config.jwtExpiresIn }
  );
}

}

export default LoginService