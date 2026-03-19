import { Response } from "express";
import { AuthRequest } from "../type/req.body";
import { blockUserService, unblockUserService } from "../service/block.service";
import mongoose from "mongoose";




// block a user

export const blockUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    const userId = req.userId as string;
    const { targetUserId } = req.params;

    const targetId = targetUserId as string;

    // check for valid target ID
    if (!targetId || !mongoose.Types.ObjectId.isValid(targetId)) {
      res.status(400).json({ 
        success: false,
        message: "Valid target user id required" });
      return;
    }

    const data = await blockUserService(userId, targetId);

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
      data,
    });


  } catch (err) {

    const errorMessage = err instanceof Error
      ? err.message
      : String(err);
    res.status(400).json({
      success: false,
      message: `Failed to block user. ${errorMessage}`
    });

  }
};



// unblock a user

export const unblockUser = async (
  req: AuthRequest,
  res: Response) => {
  try {
    const userId = req.userId as string;
    const { targetUserId } = req.params;

    const targetId = targetUserId as string;

    // check for valid target ID
    if (!targetId || !mongoose.Types.ObjectId.isValid(targetId)) {
      res.status(400).json({ 
        success: false,
        message: "Valid target user id required" });
      return;
    }

    await unblockUserService(userId, targetId);

    res.status(200).json({
      success: true,
      message: "User unblocked successfully",
    });

  } catch (err) {

    const errorMessage = err instanceof Error
      ? err.message
      : String(err);
    res.status(400).json({
      success: false,
      message: `Failed to unblock user. ${errorMessage}`
    });

  }
};
