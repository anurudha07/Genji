import mongoose from "mongoose";
import { FollowStatusValue } from "../constant/follow.constant";
import { IProfile } from "./profile.type";

export interface FeedOptions {
  userId: string;
  page: number;
  limit: number;
  skip: number;
}

export interface ProfileWithDistance extends Omit<IProfile, "__v">  {
  distance: number | null;
}


// ********  Lean Document Type ********


export type LeanProfileLocation = {
  userId: mongoose.Types.ObjectId;
  location?: {
    type: "Point";
    coordinates?: [number, number]; // [longitude, latitude]
  };
  hasLocationPermission?: boolean;
};
 

export type LeanFollow = {
  fromUserId: mongoose.Types.ObjectId;
  toUserId: mongoose.Types.ObjectId;
  status: FollowStatusValue;
};
 