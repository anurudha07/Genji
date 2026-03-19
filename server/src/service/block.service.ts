import mongoose from "mongoose";
import Block from "../model/block.model"



// block user service

export const blockUserService = async (
    userId: string,
    targetUserId: string
) => {

    if (userId === targetUserId) {
        throw new Error("You cannot block yourself");
    }

    const userObjId = new mongoose.Types.ObjectId(userId);
    const targetObjId = new mongoose.Types.ObjectId(targetUserId);

    // 🔥 check if already blocked
    const existing = await Block
    .findOne({
        userId: userObjId,
        blockedUserId: targetObjId,
    });

    if (existing) {
        throw new Error("You already blocked this user");
    }

    //   create new block
    const block = await Block
        .create({
            userId: userObjId,
            blockedUserId: targetObjId,
        });

    return block;
};