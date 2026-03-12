import { AuthRequest } from "../../../type/v1.type";
import { Response } from "express";
import { deletePhotoService, deletePremiumPhotoService, getMyProfileService, getProfileByIdService, getProfileCardService, updateProfileService, uploadPhotoService, uploadPremiumPhotoService } from "./profile.service";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";


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
            message: `Failed to fetch profile. ${errorMessage}`
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
            message: `Failed to update profile. ${errorMessage}`
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
            message: `Failed to fetch profile. ${errorMessage}`
        });
    }
};



//  get card for explore feed - ( selective data fields)

export const getProfileCard = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const { id } = req.params;

        const userId = id as string;

        const card = await getProfileCardService(userId);

        if (!card) {
            res.status(404).json({
                success: false,
                message: "Profile not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            card
        });

    } catch (err) {

        const errorMessage = err instanceof Error
            ? err.message
            : String(err);
        res.status(500).json({
            success: false,
            message: `Failed to fetch profile. ${errorMessage}`
        });

    }
};



// post photos
export const uploadPhoto = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const userId = req.userId as string;

        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
            return;
        }


        const urls: string[] = [];  // initialized as empty array initially

        for (const file of files) {
            const url = await uploadToCloudinary(file.buffer, `genji/photos/${userId}`);
            urls.push(url);
        }

        const profile = await uploadPhotoService(userId, urls);


        res.status(200).json({
            success: true,
            message: "Photo uploaded successfully",
            profile
        });

    } catch (err) {

        const errorMessage = err instanceof Error
            ? err.message
            : String(err);
        res.status(500).json({
            success: false,
            message: `Failed to upload photo. ${errorMessage}`
        });

    }
};



// delete existing photos

export const deletePhoto = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const { urlToDelete } = req.body;

        if (!urlToDelete) {
            res.status(400).json({
                success: false,
                message: "Photo URL required"
            });
            return;
        }

        const userId = req.userId as string;

        const profile = await deletePhotoService(userId, urlToDelete);
        res.status(200).json({
            success: true,
            message: "Deletion successful!",
            profile
        });

    } catch (err) {

        const errorMessage = err instanceof Error
            ? err.message
            : String(err);
        res.status(500).json({
            success: false,
            message: `Failed to delete. ${errorMessage}`
        });
    }
};



// upload premium photo

export const uploadPremiumPhoto = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
            return;
        }

        const urls: string[] = [];

        for (const file of files) {
            const url = await uploadToCloudinary(
                file.buffer,
                `genji/premium/${req.userId}`
            );
            urls.push(url);  // pushes hosted url one after another into url array 
        }

        const userId = req.userId as string;

        const profile = await uploadPremiumPhotoService(userId, urls);

        res.status(200).json({
            success: true,
            message: "Premim photo uploaded successfully",
            profile
        });

    } catch (err) {

        const errorMessage = err instanceof Error
            ? err.message
            : String(err);
        res.status(500).json({
            success: false,
            error: `Failed to upload photo. ${errorMessage}`
        });

    }
};



//  delete premium photo

export const deletePremiumPhoto = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const { premiumUrlToDelete } = req.body

        if (!premiumUrlToDelete) {
            res.status(400).json({
                success: false,
                message: "Photo URL required"
            });
            return;
        }
        const userId = req.userId as string;

        const profile = await deletePremiumPhotoService(userId, premiumUrlToDelete);

        res.status(200).json({
            success: true,
            message: "Deletion successful!",
            profile
        });

    } catch (err) {

        const errorMessage = err instanceof Error
            ? err.message
            : String(err);
        res.status(500).json({
            success: false,
            message: `Failed to delete. ${errorMessage}`
        });
    }
};