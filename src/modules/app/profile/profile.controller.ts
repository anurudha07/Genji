import { AuthRequest } from "../../../types/v1.types";
import { Response } from "express";
import { getMyProfileService, getProfileByIdService, updateProfileService } from "./profile.service";


// get my profile 

export const getMyProfile = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const userId = req.userId as string; 

        const profile = await getMyProfileService(userId);

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            profile
        });

    } catch (err) {

        const errorMessage = err instanceof Error
            ? err.message
            : String(err);
        res.status(500).json({
            success: false,
            message: `Failed to fetch profile... ${errorMessage}`
        });

    }
};


//  create or update profile

export const updateProfile = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const userId = req.userId as string;

        const profile = await updateProfileService(userId, req.body);

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile
        });

    } catch (err) {

        const errorMessage = err instanceof Error
            ? err.message
            : String(err);
        res.status(500).json({
            success: false,
            message: `Failed to update profile... ${errorMessage}`
        });

    }
};


// get full profile of target user

export const getProfileById = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const { id } = req.params;

        // TODO: replace false with actual coin payment check once coins module is ready
        const hasPaid = false;

        const userId = id as string

        const profile = await getProfileByIdService(userId, hasPaid);

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            profile
        });

    } catch (err) {

        const errorMessage = err instanceof Error
            ? err.message
            : String(err);
        res.status(500).json({
            success: false,
            message: `Failed to fetch profile... ${errorMessage}`
        });
    }
};



//  get card for explore feed - ( selective data fields)

// export const getProfileCard = async (
//     req: AuthRequest, 
//     res: Response
// ): Promise<void> => {

//   try {

//     const { id } = req.params;

//     const card = await getProfileCardService(id);

//     if (!card) {
//         res.status(404).json({ 
//             success: false,
//             message: "Profile not found" });
//         return;
//     }

//     res.status(200).json({ 
//         success: true,
//         message: "Profile fetched successfully",
//         card 
//     });

//   } catch (err) {

//     const errorMessage = err instanceof Error 
//     ? err.message 
//     : String(err);
//     res.status(500).json({ 
//         success: false,
//         message: `Failed to fetch profile... ${errorMessage}`
//     });

//   }
// };