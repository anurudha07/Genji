import { Response } from "express";
import { sendOtpService, verifyOtpService } from "./auth.service";
import { AdminRequest } from "../../../type/v1.type";


// send otp 
export const sendOtp = async (
    req: AdminRequest,
    res: Response
): Promise<void> => {
    try {
        const { phone } = req.body;

        if (!phone) {
            res.status(400).json({ 
                success: false,
                message: "Phone number is required" 
            });
            return;
        }

        await sendOtpService(phone);

        res.status(200).json({ 
            success: true,
            message: "OTP sent successfully" 
        });
    } catch (err) {
        const errorMessage = err instanceof Error
            ? ` ${err.message}`
            : String(err);
        res.status(500).json({ 
            success: false,
            message: `Failed to send OTP. ${errorMessage}`
        });
    }
};

// verify otp
export const verifyOtp = async (
    req: AdminRequest,
    res: Response
): Promise<void> => {
    try {
        const { phone, otp } = req.body;
        if (!phone || !otp) {
            res.status(400).json({ 
                success: false,
                message: "Phone no. and OTP are required" 
            });
            return
        }

        const token = await verifyOtpService(phone, otp);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (err) {
        const errorMessage = err instanceof Error
            ? ` ${err.message}`
            : String(err);
        res.status(400).json({ 
            success: false,
            message: `Invalid OTP: ${errorMessage}`
        });
        
    }
};


