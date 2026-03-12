import { Router } from "express";
import authRouter from "../../module/app/auth/auth.route";
import profileRouter from "../../module/app/profile/profile.route";
import followRouter from "../../module/app/follow/follow.route";


const router = Router();

router.use('/auth',authRouter)
router.use('/profile',profileRouter)
router.use('/follow',followRouter)

export default router;