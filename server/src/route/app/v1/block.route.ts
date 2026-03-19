import { Router } from "express";
import { blockUser } from "../../../controller/block.controller";
import { userAuth } from "../../../middleware/auth.middleware";


const blockRouter = Router();

blockRouter.post("/:targetUserId", userAuth, blockUser);


export default blockRouter;