import { Response } from "express";
import { googleLoginService, sendOtpService, verifyOtpService } from "./auth.service";
import { AuthRequest } from "../../../types/v1.types";


// send otp 
export const sendOtp = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const { phone } = req.body;

        if (!phone) {
            res.status(400).json({ message: "Phone number is required" });
        }

        await sendOtpService(phone);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        const errorMessage = err instanceof Error
            ? ` ${err.message}`
            : String(err);
        res.status(500).json({ message: "Failed to send OTP...", errorMessage });
    }
};

// verify otp
export const verifyOtp = async (
    req: AuthRequest,
    res: Response
): Promise<Response> => {
    try {
        const { phone, otp } = req.body;
        if (!phone || !otp) {
            return res.status(400).json({ message: "Phone no. and OTP are required" });
        }

        const token = await verifyOtpService(phone, otp);

        return res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (err) {
        const errorMessage = err instanceof Error
            ? ` ${err.message}`
            : String(err);
        return res.status(400).json({ message: "Invalid OTP:", errorMessage });
    }
};

// google login
export const googleLogin = async (
    req: AuthRequest,
    res: Response
): Promise<Response> => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ message: "Google idToken required" });
        }

        const token = await googleLoginService(idToken);

        return res.status(200).json({ token });
    } catch (err) {
        const errorMessage = err instanceof Error
            ? ` ${err.message}`
            : String(err);
        return res.status(500).json({ message: "Google login failed", errorMessage });
    }
};

