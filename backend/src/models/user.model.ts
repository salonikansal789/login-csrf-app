import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserDocument } from "../interface/user.interface";



const UserSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String }
}, { timestamps: true });

export const UserModel: Model<IUserDocument> = mongoose.model("User", UserSchema);
