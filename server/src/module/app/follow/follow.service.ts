
import mongoose from "mongoose";
import { IFollow } from "./follow.type";
import Follow from './follow.model'
import { FOLLOW_STATUS } from "./follow.constant";


// send follow request service

export const sendFollowRequestService = async (
  fromUserId: string,
  toUserId: string
): Promise<IFollow> => {
 
  if (fromUserId === toUserId)
    throw new Error("You cannot follow yourself");
 
  const from = new mongoose.Types.ObjectId(fromUserId);
  const to = new mongoose.Types.ObjectId(toUserId);
 
  const existing = await Follow
  .findOne({ 
    fromUserId: from, 
    toUserId: to 
   });  console.log(existing)
 
  // if already pending, don't allow a new request
  if (existing && (existing.status === FOLLOW_STATUS.PENDING ))
    throw new Error("You already sent a follow request");

  // if already accepted don't allow a new request
  if (existing && ( existing.status === FOLLOW_STATUS.ACCEPTED))
    throw new Error("You already follow this user.");
 
  // if declined or withdrawal — reopen the doc as a new pending request
  if (existing) {
    existing.status = FOLLOW_STATUS.PENDING;
    await existing.save();
    return existing;
  }
 
  // no existing doc — create fresh one
  const request = await Follow
  .create({ 
    fromUserId: from, 
    toUserId: to, 
    status: FOLLOW_STATUS.PENDING 
   });
 
  return request;
};
 