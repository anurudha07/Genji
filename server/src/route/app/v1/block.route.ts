import { Router } from "express";
import { blockUser, getBlockedUsers, unblockUser } from "../../../controller/block.controller";
import { userAuth } from "../../../middleware/auth.middleware";


const blockRouter = Router();

// get blocked user list
blockRouter.get("/list", userAuth, getBlockedUsers);

// block an user
blockRouter.post("/:targetUserId", userAuth, blockUser);

// unblock an user
blockRouter.delete("/:targetUserId", userAuth, unblockUser);



export default blockRouter;