import { Router } from "express";
import { googleLogin, sendOtp, verifyOtp } from "../../../controller/auth.controller";
import { otpLimiter } from "../../../util/limiter";


const authRouter = Router();

// send otp to user
authRouter.post("/send-otp", otpLimiter, sendOtp);

// otp verification for valid otp
authRouter.post("/verify-otp", otpLimiter, verifyOtp);

// googlr login or register 
authRouter.post("/google", googleLogin);

export default authRouter;