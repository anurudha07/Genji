import mongoose from "mongoose";
import Block from "../model/block.model";

export const blockUserService = async (
  userId: string,
  targetUserId: string
) => {
  // Guard: cannot block yourself
  if (userId === targetUserId) {
    const error = new Error("You cannot block yourself");
    (error as any).statusCode = 400;
    throw error;
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);
  const targetObjectId = new mongoose.Types.ObjectId(targetUserId);

  // Guard: already blocked — check before attempting insert
  const existingBlock = await Block.findOne({
    userId: userObjectId,
    blockedUserId: targetObjectId,
  });

  if (existingBlock) {
    const error = new Error("You have already blocked this user");
    (error as any).statusCode = 409;
    throw error;
  }

  // Create the block document
  const block = await Block.create({
    userId: userObjectId,
    blockedUserId: targetObjectId,
  });

  return block;
};