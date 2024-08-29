import mongoose, { Model } from "mongoose";
import jwt from 'jsonwebtoken'
import config from "../config";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  tokens: { token: string }[],
}

interface IUserMethods extends IUser {
  generateAuthToken: () => Promise<string>;
}

export type IUserModel = Model<IUserMethods>;

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokens: [{
    token: String,
  }]
}, {
  timestamps: true
});

userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();
  delete userObject.tokens;
  delete userObject.password;

  return userObject;
}

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, config.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

const User = mongoose.model<IUser, IUserModel>("users", userSchema);
export default User;
