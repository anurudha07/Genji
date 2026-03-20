import { Router } from "express";
import authRouter from "./auth.route";
import profileRouter from "./profile.route";
import followRouter from "./follow.route";
import blockRouter from "./block.route";
import feedRouter from "./feed.route";


const router = Router();

router.use('/auth',authRouter)
router.use('/profile',profileRouter)
router.use('/follow',followRouter)
router.use('/block',blockRouter)
router.use('/feed',feedRouter)

export default router;