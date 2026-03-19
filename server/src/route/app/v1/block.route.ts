import { Router } from "express";
import { blockUser } from "../../../controller/block.controller";


const blockRouter = Router();

blockRouter.post("/:targetUserId", blockUser);


export default blockRouter;