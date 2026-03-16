import { Router } from "express";
import authRouter from "./auth.route";
import profileRouter from "./profile.route";
import followRouter from "./follow.route";


const router = Router();

router.use('/auth',authRouter)
router.use('/profile',profileRouter)
router.use('/follow',followRouter)

export default router;