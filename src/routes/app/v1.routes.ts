import { Router } from "express";
import authRouter from "../../modules/app/auth/auth.routes";
import profileRouter from "../../modules/app/profile/profile.routes";


const router = Router();

router.use('/auth',authRouter)
router.use('/profile',profileRouter)
export default router;