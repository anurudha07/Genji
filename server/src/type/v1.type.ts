import { Request } from "express";
import mongoose, { Types } from "mongoose";

export interface UserBody {
  phone: string;
  otp: string;
  idToken: string;
  name: string;
  gender: string;
  age: number;
  bio?: string;
  placeOfBirth?: string;
  height?: number;
  weight?: number;
  city?: string;
  state?: string;
  country?: string;
  work?: string;
  about: string[];
  foodType?: string;
  skinTone?: string;
  religion?: string;
  motherTongue?: string;
  lookingFor: string[];
  interests: string[];
  starSign?: string;
  pronouns?: string;
  interestedIn?: string[];
  sexualOrientation?: string;
  photos: string[];
  urlToDelete: string;
  premiumUrlToDelete: string;
}

// authenticated user type declaration for req object
export interface AuthRequest extends Request {
  userId?: string;
  body: UserBody;
}