import mongoose from "mongoose";
import { Document } from "mongoose";


export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
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
  location: {
    type: "Point";
    coordinates: number[];
  };
  hasLocationPermission: boolean;
}


export interface IProfileCard {
  firstName: string;
  age: number;
  pronouns: string;
  bio: string;
  gender: string;
  photos: string[];
  lookingFor: string[];
  about: string[];
  interests: string[];
  city: string;
  state: string;
}