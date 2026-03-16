import mongoose, { Document, Types } from "mongoose";
import { FollowStatusValue } from "../constant/follow.constant";
import { IProfile } from "./profile.type";

export interface IFollow extends Document {
  fromUserId: Types.ObjectId;   // user who sent the request
  toUserId: Types.ObjectId;     // user who received the request
  status: FollowStatusValue;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedResult {
  data: IProfileListItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface IProfileListItem {
  firstName: string;
  photos: string[];
}

export interface IFollowingIdLean {
  toUserId: mongoose.Types.ObjectId;
}

export interface IFollowerIdLean {
  fromUserId: mongoose.Types.ObjectId;
}