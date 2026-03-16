import { Router } from "express";
import { sendOtp, verifyOtp } from "./auth.controller";
import { otpLimiter } from "./auth.limiter";


const authRouter = Router();

// send otp to user
authRouter.post("/send-otp", otpLimiter, sendOtp);

// otp verification for valid otp
authRouter.post("/verify-otp", otpLimiter, verifyOtp);



export default authRouter;