import mongoose from "mongoose";
import Block from "../model/block.model"
import { BlockResult, IBlock, IBlockLean } from "../type/block.type";
import Profile from "../model/profile.model";
import { IProfileListItem } from "../type/follow.type";


// block user service

export const blockUserService = async (
  userId: string,
  targetId: string
): Promise<IBlock> => {

  if (userId === targetId) {
    throw new Error("You cannot block yourself");
  }

  const userObjId = new mongoose.Types.ObjectId(userId);
  const targetObjId = new mongoose.Types.ObjectId(targetId);

  // Guard: already blocked — check before attempting insert
  const existingBlock = await Block
    .findOne({
      userId: userObjId,
      blockedUserId: targetObjId,
    });

  if (existingBlock) {
    throw new Error("You have already blocked this user");
  }

  //   create new block
  const block = await Block
    .create({
      userId: userObjId,
      blockedUserId: targetObjId,
    });

  return block;
};


// unblock user service

export const unblockUserService = async (
  userId: string,
  targetUserId: string
): Promise<IBlock> => {

  if (userId === targetUserId) {
    throw new Error("You cannot unblock yourself");
  }

  const userObjId = new mongoose.Types.ObjectId(userId);
  const targetObjId = new mongoose.Types.ObjectId(targetUserId);

  const result = await Block
    .findOneAndDelete({
      userId: userObjId,
      blockedUserId: targetObjId,
    });

  if (!result) {
    throw new Error("You have not blocked this user.");
  }

  return result;

};



// get blocked users service

export const getBlockedUsersService = async (
  userId: string,
  page: number,
  limit: number,
  skip: number
): Promise<BlockResult> => {

  //  get blocked users with profile
  const blocked = await Block
    .find({ userId })
    .select("blockedUserId")
    .skip(skip)
    .limit(limit)
    .lean<IBlockLean[]>();

  //  extract blocked Ids
  const blockedIds = blocked.map(b => b.blockedUserId);

  //  get profiles using those IDs
  const profiles = await Profile
    .find({
      userId: blockedIds 
    })
    .select("firstName photos")
    .lean<IProfileListItem[]>();

  //  total count
  const totalCount = await Block
    .countDocuments({ userId });


  return {
    data: profiles,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    limit
  };
};