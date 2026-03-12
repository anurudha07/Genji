import { Router } from "express";
import { userAuth } from "../auth/auth.middleware";
import {
  sendFollowRequest,

} from "./follow.controller";

const followRouter = Router();



// send a follow request to another user
followRouter.post("/request/:targetUserId", userAuth, sendFollowRequest);



export default followRouter;