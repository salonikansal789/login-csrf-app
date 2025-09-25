import { UserModel } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../config/default";
import ResponseService from "./response.service";
import { BadRequestError } from "../errors/badRequestError";
import { NotFoundError } from "../errors/notFoundError";
class LoginService extends ResponseService {

async login  (email: string, password: string)  {
  if (!email || !password) {
    throw new BadRequestError('Email and password are required');
  }

  const user = await UserModel.findOne({ email }).lean();
  if (!user) {
   throw new BadRequestError('Invalid credentials');
  }

  const match = await bcrypt.compare(password, (user as any).password);
  if (!match) {
    throw new BadRequestError('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    config.jwtSecret,
    { expiresIn: +config.jwtExpiresIn }
  );

  return this.serviceResponse(200, { data: token }, 'Login successfully');
 
}

async whoami(userId: string) {
  const user = await UserModel.findById(userId).select('-passwordHash').lean();
  if (!user) {
   throw new NotFoundError('User not found');

  }
  return this.serviceResponse(200, { user }, 'User fetched successfully');
}


}

export default LoginService