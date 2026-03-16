import rateLimit from "express-rate-limit";

export const otpLimiter = rateLimit({
    windowMs: 30 * 60 * 1000,  // 30 mins
    max: 8,   // 8 attempts
    message: { message: "Too many requests. Please try again after 30 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});