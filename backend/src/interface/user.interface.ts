import { Document}  from "mongoose";

export interface IUser {
  email: string;
  password: string; 
  name?: string;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidate: string): Promise<boolean>;
}
