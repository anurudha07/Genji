import { Document, Types } from "mongoose";
import { FollowStatusValue } from "./follow.constant";
import { IProfile } from "../profile/profile.type";

export interface IFollow extends Document {
  fromUserId: Types.ObjectId;   // user who sent the request
  toUserId: Types.ObjectId;     // user who received the request
  status: FollowStatusValue;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedResult {
  data: IProfile[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}