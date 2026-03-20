import { Document, Types } from 'mongoose';
import { IProfileListItem } from './follow.type';

export interface IBlock extends Document {
  userId: Types.ObjectId;
  blockedUserId: Types.ObjectId;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlockResult {
  data: IProfileListItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}


// ********  Lean Document Type ********


export interface IBlockLean {
  userId: Types.ObjectId;
  blockedUserId: Types.ObjectId;
}