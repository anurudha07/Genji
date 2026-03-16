import { Router } from "express";
import { userAuth } from "../auth/auth.middleware";
import {
  getFollowersList,

  removeFollower,
  respondToFollowRequest,
  sendFollowRequest,
  unfollowUser,
  withdrawalFollowRequest,

} from "./follow.controller";

const followRouter = Router();


// get my followers list
followRouter.get("/followers-list", userAuth, getFollowersList);

// get list of users I follow
// followRouter.get("/following-list", userAuth, getFollowingList);

// send a follow request to another user
followRouter.post("/request/:targetUserId", userAuth, sendFollowRequest);

// accept or decline a follow request received from another user
followRouter.post("/response/:targetUserId", userAuth, respondToFollowRequest);

// cancel a follow request user previously sent
followRouter.patch("/withdrawal/:targetUserId", userAuth, withdrawalFollowRequest);

// remove someone from my followers list
followRouter.delete("/remove/:targetUserId", userAuth, removeFollower);

// unfollow a user I currently follow 
followRouter.delete("/:targetUserId", userAuth, unfollowUser);



export default followRouter;