import { Router } from "express";
import { googleLogin, sendOtp, verifyOtp } from "./auth.controller";
import { otpLimiter } from "./auth.limiter";


const authRouter = Router();

authRouter.post("/send-otp", otpLimiter, sendOtp);
authRouter.post("/verify-otp", otpLimiter, verifyOtp);
authRouter.post("/google", googleLogin);

export default authRouter;