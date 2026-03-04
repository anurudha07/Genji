import { AuthRequest } from "../../../types/v1.types";
import { Response } from "express";
import { getMyProfileService, updateProfileService } from "./profile.service";

// get my profile 

export const getMyProfile = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        if (!req.userId){
            res.status(401).json({
                success: false,
                message: 'Authentication failed'
            })
            return;
        }

        const profile = await getMyProfileService(req.userId);


        res.status(200).json({
            success: true,
            profile
        });

    } catch (err) {

        const errorMessage = err instanceof Error
            ? err.message
            : String(err);
        res.status(500).json({ errorMessage });

    }
};


//  create or update profile

export const updateProfile = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        if (!req.userId){
            res.status(401).json({
                success: false,
                message: 'Authentication failed'
            })
            return;
        }

        const userId = req.userId;

        const profile = await updateProfileService(userId, req.body);

        res.status(200).json({
            success: true,
            profile
        });

    } catch (err) {

        const errorMessage = err instanceof Error
            ? err.message
            : String(err);
        res.status(500).json({ errorMessage });

    }
};