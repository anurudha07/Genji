import { Request } from "express";
import mongoose from "mongoose";
import { Document } from "mongoose";

export interface UpdateProfileBody {
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
  about?: string[];
  foodType?: string;
  skinTone?: string;
  religion?: string;
  motherTongue?: string;
  lookingFor?: string[];
  interests?: string[];
  starSign?: string;
  pronouns?: string;
  interestedIn?: string[];
  sexualOrientation?: string;
}

export interface UpdateProfileRequest extends Request {
  body: UpdateProfileBody;
  userId?: string;
}


export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  age: number;
  gender: string;
  placeOfBirth: string;
  height: number;
  weight: number;
  city: string;
  state: string;
  country: string;
  work: string;
  about: string[];
  foodType: string;
  skinTone: string;
  religion: string;
  motherTongue: string;
  lookingFor: string[];
  starSign: string;
  photos: string[];           // max 4 — cloudinary URLs
  premiumPhotos: string[];    // creators only — cloudinary URLs
  profileCompletionPercentage: number;
  pronouns: string;
  sexualOrientation: string;
  bio: string;
  isCreator: boolean;
  interests: string[];
  interestedIn: string[];
  lastActiveAt: Date;
}