import { UserBody } from "../type/v1.type";
import { calcCompletion } from "../util/calcCompletion";
import Profile from "../model/profile.model"
import { IProfile, IProfileCard } from "../type/profile.type";



// get my profile service

export const getMyProfileService = async (
    userId: string
): Promise<IProfile> => {

    const profile = await Profile
    .findOne({ userId })
    .lean<IProfile>();

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
        { upsert: true, returnDocument: "after" }   // upsert: true means if doc didnt exist it creates new 
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
        .findOne({ userId: profileUserId })
        .lean<IProfile>();

    if (!profile)
        throw new Error("Profile not found");

    if (!hasPaid)
        profile.premiumPhotos = [];

    return profile;
};



//  get card data for explore feed

export const getProfileCardService = async (
    userId: string
): Promise<IProfileCard> => {

    const profile = await Profile
        .findOne({ userId })
        .select(
            "firstName age pronouns bio gender photos lookingFor about interests city state"
        )
        .lean<IProfileCard>();

    if (!profile)
        throw new Error("Profile not found");

    return profile;

};



// post photo service
export const uploadPhotoService = async (
    userId: string,
    urls: string[]
): Promise<IProfile> => {

    const profile = await Profile
        .findOne({ userId });

    if (!profile)
        throw new Error("Profile not found");

    if (profile.photos.length >= 4)
        throw new Error("Max 4 photos allowed");

    for (const url of urls) {
        profile.photos.push(url);
    }

    profile.profileCompletionPercentage = calcCompletion(profile);

    await profile.save();

    return profile;
};



// delete photo service

export const deletePhotoService = async (
    userId: string,
    urlToDelete: string
): Promise<IProfile> => {

    const profile = await Profile
        .findOne({ userId });

    if (!profile)
        throw new Error("Profile not found");

    if (profile.photos.length <= 2)
        throw new Error("Minimum of 2 photos are required");

    const newPhotos: string[] = [];

    for (const photo of profile.photos) {
        if (photo !== urlToDelete) {  // check for any photo mtches the body url
            newPhotos.push(photo);  //  keep the photo by adding it to the new array excluding body photo url
        }
    }

    profile.photos = newPhotos;

    profile.profileCompletionPercentage = calcCompletion(profile);

    await profile.save();
    return profile;
};



// upload premium photo — creators only

export const uploadPremiumPhotoService = async (
    userId: string,
    urls: string[]
): Promise<IProfile> => {

    const profile = await Profile
        .findOne({ userId });

    if (!profile)
        throw new Error("Profile not found");

    if (!profile.isCreator)
        throw new Error("Only creators can upload premium photos");  // user need to be creator first to upload premium photo for their fans

    // limit to 12 for now
    if (profile.premiumPhotos.length + urls.length > 12)
        throw new Error("Max 12 premium photos allowed");

    for (const url of urls) {
        profile.premiumPhotos.push(url);
    }

    await profile.save();  // saving in doc

    return profile;
};



// delete premium photo

export const deletePremiumPhotoService = async (
    userId: string,
    premiumUrlToDelete: string
): Promise<IProfile> => {

    const profile = await Profile
        .findOne({ userId });

    if (!profile)
        throw new Error("Profile not found");

    const newPremiumPhotos: string[] = [];

    for (const photo of profile.premiumPhotos) {
        if (photo !== premiumUrlToDelete) {  // check for any photo mtches the body url
            newPremiumPhotos.push(photo);  //  keep the photo by adding it to the new array excluding body photo url
        }
    }

    profile.premiumPhotos = newPremiumPhotos;

    await profile.save();

    return profile;
};