import { Request } from "express";

import { SettingKey } from "../constant/setting.constant";
import { SettingValue } from "./admin.setitng.type";

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
  action: string;
  latitude?: number;
  longitude?: number;
}

// authenticated user type declaration for req object
export interface AuthRequest extends Request {
  userId?: string;
  body: UserBody;
}




// ------------  ****  --------------




export interface AdminBody {
  phone: string;
  otp: string;
  role: 'admin' | 'user';
  keys: SettingKey[];
  key: SettingKey;
  value: SettingValue,
}

export interface AdminRequest extends Request {
  adminId?: string;
  body: AdminBody;
}