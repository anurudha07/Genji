import { UserBody } from "../../../types/v1.types";
import { calcCompletion } from "../../../utils/calcCompletion";
import Profile from "./profile.model"
import { IProfile } from "./profile.types";



// get my profile service

export const getMyProfileService = async (
    userId: string
): Promise<IProfile> => {

    const profile = await Profile.findOne({ userId });
    console.log(profile);

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
        { upsert: true }
    );

    if (!profile)
        throw new Error("Failed to update profile");

    profile.profileCompletionPercentage = calcCompletion(profile);
    await profile.save();

    return profile;
};