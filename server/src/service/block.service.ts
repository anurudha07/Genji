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

    const userObjId = new mongoose.Types.ObjectId(userId);
    const targetObjId = new mongoose.Types.ObjectId(targetUserId);

    const result = await Block
        .findOneAndDelete({
            userId: userObjId,
            blockedUserId: targetObjId,
        });

    return result;

};