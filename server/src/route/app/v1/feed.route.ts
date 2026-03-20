import { Router } from "express";
import { userAuth } from "../../../middleware/auth.middleware";
import { getFeed } from "../../../controller/feed.controller";


const feedRouter = Router();

// get explore feed
feedRouter.get("/", userAuth, getFeed);


export default feedRouter;