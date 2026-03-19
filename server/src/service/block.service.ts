import mongoose from "mongoose";
import Block from "../model/block.model"



// block user service

export const blockUserService = async (
    userId: string,
    targetId: string
) => {

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
) => {

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