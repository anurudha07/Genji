import { Router } from "express";
import { blockUser, getBlockedUsers, unblockUser } from "../../../controller/block.controller";
import { userAuth } from "../../../middleware/auth.middleware";


const blockRouter = Router();

blockRouter.get("/list", userAuth, getBlockedUsers);
blockRouter.post("/:targetUserId", userAuth, blockUser);
blockRouter.delete("/:targetUserId", userAuth, unblockUser);



export default blockRouter;