import { Router } from "express";
import { blockUser, unblockUser } from "../../../controller/block.controller";
import { userAuth } from "../../../middleware/auth.middleware";


const blockRouter = Router();

blockRouter.post("/:targetUserId", userAuth, blockUser);
blockRouter.delete("/:targetUserId", userAuth, unblockUser);


export default blockRouter;