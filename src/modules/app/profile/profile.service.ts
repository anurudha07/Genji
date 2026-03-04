import { UserBody } from "../../../types/v1.types";
import { calcCompletion } from "../../../utils/calcCompletion";
import Profile from "./profile.model"
import { IProfile } from "./profile.types";



// get my profile service

export const getMyProfileService = async (
    userId: string
): Promise<IProfile> => {

    const profile = await Profile.findOne({ userId });

    if (!profile) throw new Error("Profile not found");

    return profile;

};


// add or update profile service

export const updateProfileService = async (
    userId: string,
    data: UserBody
): Promise<IProfile> => {

    const profile = await Profile.findOneAndUpdate(
        { userId },
        { $set: data },
        { upsert: true, returnDocument: "after" }   // upsert: truye means if doc didnt exist it creates new & 
    );

    if (!profile)
        throw new Error("Failed to update profile");

    profile.profileCompletionPercentage = calcCompletion(profile);
    await profile.save();

    return profile;
};


//  get someone's full profile — premium locked until paid

export const getProfileByIdService = async (
    profileUserId: string,
    hasPaid: boolean
): Promise<IProfile> => {

    const profile = await Profile
        .findOne({ userId: profileUserId });

    if (!profile)
        throw new Error("Profile not found");

    if (!hasPaid)
        profile.premiumPhotos = [];

    return profile;
};



//  get card data for explore feed

export const getProfileCardService = async (
    userId: string
): Promise<Partial<IProfile>> => {

    const profile = await Profile
        .findOne({ userId })
        .select(
            "name age pronouns bio gender photos lookingFor about interests city state"
        );

    if (!profile)
        throw new Error("Profile not found");

    return profile;

};
