
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
   }); 
 
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

 

// respond to follow request service 

export const respondToFollowRequestService = async (
  currentUserId: string,   // the person who received the request (me)
  fromUserId: string,      // the person who sent the request
  action: "accepted" | "declined"
): Promise<IFollow> => {
 
  const from = new mongoose.Types.ObjectId(fromUserId);
  const to = new mongoose.Types.ObjectId(currentUserId);
 
  const request = await Follow
  .findOne({ 
    fromUserId: from, 
    toUserId: to, 
    status: FOLLOW_STATUS.PENDING 
  });
 
  if (!request)
    throw new Error("No pending follow request found from this user");
 
  // update status based on action — keep the doc either way
  request.status = action === "accepted" ? FOLLOW_STATUS.ACCEPTED : FOLLOW_STATUS.DECLINED;
  await request.save();
 
  return request;
};



// withdrawal of follow request service

export const withdrawalFollowRequestService = async (
  fromUserId: string,
  toUserId: string
): Promise<IFollow> => {
 
  const from = new mongoose.Types.ObjectId(fromUserId);
  const to = new mongoose.Types.ObjectId(toUserId);
 
  const request = await Follow
  .findOne({ 
    fromUserId: from, 
    toUserId: to, 
    status: FOLLOW_STATUS.PENDING 
   });
 
  if (!request)
    throw new Error("No pending follow request found to withdraw");
 
  request.status = FOLLOW_STATUS.WITHDRAWAL;
  await request.save();
 
  return request;
};
 


// unfollow user service 

export const unfollowUserService = async (
  fromUserId: string,
  toUserId: string
): Promise<IFollow> => {
 
  const from = new mongoose.Types.ObjectId(fromUserId);
  const to = new mongoose.Types.ObjectId(toUserId);
 
  const follow = await Follow
  .findOne({ 
    fromUserId: from, 
    toUserId: to, 
    status: FOLLOW_STATUS.ACCEPTED 
});
 
  if (!follow)
    throw new Error("You are not following this user");
 
  // mark as withdrawn — keeps the doc for re-follow later
  follow.status = FOLLOW_STATUS.WITHDRAWAL;
  await follow.save();
 
  return follow;
};



// remove follower service

export const removeFollowerService = async (
  currentUserId: string,
  followerUserId: string
): Promise<IFollow> => {
 
  const from = new mongoose.Types.ObjectId(followerUserId);
  const to = new mongoose.Types.ObjectId(currentUserId);
 
  const follow = await Follow
  .findOne({ 
    fromUserId: from, 
    toUserId: to, 
    status: FOLLOW_STATUS.ACCEPTED 
  });
 
  if (!follow)
    throw new Error("This user is not in your followers list");
 
  // mark as declined — keeps the doc, blocks them from re-requesting spam
  follow.status = FOLLOW_STATUS.DECLINED;
  await follow.save();
 
  return follow;
};