import { Response } from "express";
import { AuthRequest } from "../type/req.body";
import { getPagination } from "../util/getPagination";


export const getUserFeed = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    try {

        const userId = req.userId as string;

        const { page, limit, skip } = getPagination(req);

        const data = await getFeedService({ userId, page, limit, skip});

        res.status(200).json({
            success: true,
            message: "Feed fetched successfully",
            ...data,
        });

    } catch (err) {

        const errorMessage = err instanceof Error
            ? err.message
            : String(err);

        res.status(500).json({
            success: false,
            message: `Failed to fetch feed. ${errorMessage}`,
        });

    }
};