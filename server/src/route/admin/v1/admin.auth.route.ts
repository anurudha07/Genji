import { Router } from "express";
import { otpLimiter } from "../../../util/limiter";
import { sendOtp, verifyOtp } from "../../../controller/admin.auth.controller";

const authRouter = Router();

// send otp to user
authRouter.post("/send-otp", otpLimiter, sendOtp);

// otp verification for valid otp
authRouter.post("/verify-otp", otpLimiter, verifyOtp);



export default authRouter;