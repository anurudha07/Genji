import { Router } from "express";
import authRouter from "../../module/app/auth/auth.route";
import profileRouter from "../../module/app/profile/profile.route";


const router = Router();

router.use('/auth',authRouter)
router.use('/profile',profileRouter)
export default router;