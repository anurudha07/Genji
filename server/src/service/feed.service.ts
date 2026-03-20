import mongoose from "mongoose";
import Profile from "../model/profile.model";
import Follow from "../model/follow.model";
import Block from "../model/block.model";
import { FeedOptions, LeanFollow, LeanProfileLocation, ProfileWithDistance } from "../type/feed.type";
import { IBlockLean } from "../type/block.type";
import { FOLLOW_STATUS } from "../constant/follow.constant";
import { shuffleArray } from "../util/feedShuffle";
import { getDistance } from "../util/geo";

export const getFeedService = async ({
    userId,
    page,
    limit,
    skip,
}: FeedOptions) => {

    // fetch logged in user's profile - location only
    const currentProfile = await Profile
        .findOne({ userId })
        .select("location hasLocationPermission")
        .lean<LeanProfileLocation>();

    // fetch all blocks made by the logged in user
    const blocks = await Block
        .find({ userId })
        .select("blockedUserId")
        .lean<IBlockLean[]>();

    // collect blocked user ids into an array
    const blockedIds: mongoose.Types.ObjectId[] = [];  // initialize as empty [] initially

    for (const block of blocks) {
        blockedIds.push(block.blockedUserId);
    }

    // fetch all follow docs where the logged in user is sender or receiver
    const follows = await Follow
        .find({
            $or: [
                { fromUserId: new mongoose.Types.ObjectId(userId) },
                { toUserId: new mongoose.Types.ObjectId(userId) },
            ],
        })
        .lean<LeanFollow[]>();

    // hide users based on follow status
    const hiddenIds: mongoose.Types.ObjectId[] = [];

    for (const follow of follows) {
        if (
            follow.status === FOLLOW_STATUS.ACCEPTED ||
            follow.status === FOLLOW_STATUS.PENDING ||
            follow.status === FOLLOW_STATUS.DECLINED
        ) {
            // hide both sides - sender and receiver
            hiddenIds.push(follow.fromUserId, follow.toUserId);
        }
        // WITHDRAWAL status, reappear in feed
    }

    //  blocked + hidden into exclude list
    const excludeIds = blockedIds.concat(hiddenIds);

    // fetch all profiles except - self and excluded users
    const profiles = await Profile
        .find({
            userId: {
                $ne: userId,
                $nin: excludeIds,
            },
        })
        .select("-__v")
        .lean<ProfileWithDistance[]>();

    // build the final feed array
    let finalFeed: ProfileWithDistance[] = [];


    /* -------- if no location  → Fully Random  -------- */

    if (
        !currentProfile?.hasLocationPermission ||
        !currentProfile.location?.coordinates ||
        currentProfile.location.coordinates.length < 2
    ) {

        // attach null in each doc and then randomize 
        finalFeed = shuffleArray(
            profiles.map(u => ({ ...u, distance: null }))
        )
    }

    /* -------------------- Location Logic -------------------- */

    else {

        const origin = currentProfile.location.coordinates;

        const limits: number[] = await readFeedBucketsFromSettings();

        const buckets: Record<number, ProfileWithDistance[]> = {};

        for (let i = 0; i <= limits.length; i++) {
            buckets[i] = [];  // creating empty array for each index
        }

        const unknown: ProfileWithDistance[] = [];

        for (const profile of profiles) {

            if (
                !profile.hasLocationPermission ||
                !profile.location?.coordinates ||
                profile.location.coordinates.length < 2
            ) {
                unknown.push({ ...profile, distance: null });
                continue;
            }

            const distance = getDistance(
                origin,
                profile.location.coordinates as [number, number]
            );

            const enriched: ProfileWithDistance = {
                ...profile,
                distance
            };

            let placed = false;

            for (let i = 0; i < limits.length; i++) {
                if (distance <= limits[i]) {
                    buckets[i].push(enriched);  // push to the consecutive bucket
                    placed = true;
                    break;
                }
            }

            // beyond limits - distance exceeds all configured limits
            if (!placed) {
                buckets[limits.length].push(enriched);
            }

        }

        //! IMPORTANT:
        // The order of pushes defines feed ranking priority:
        // Changing this will change behavior.

        finalFeed = [];

        // take profiles from each bucket, shuffle them, and add to the feed
        for (let i = 0; i <= limits.length; i++) {
            finalFeed.push(...shuffleArray(buckets[i]));
        }

        // shuffle unknown bucket and add to final feed
        finalFeed.push(...shuffleArray(unknown));

        
        // end

    }

    /* -------------------- Pagination -------------------- */

    const totalUsers = finalFeed.length;
    const paginated = finalFeed.slice(skip, skip + limit);

    return {
        users: paginated,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page
    };

};
