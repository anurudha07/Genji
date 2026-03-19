import { Response } from "express";
import { AuthRequest } from "../type/req.body";




// block a user

export const blockUser = async (
    req: AuthRequest, 
    res: Response
) : Promise<void>=> {
  try {

    const userId = req.userId as string;
    const { targetUserId } = req.params;

    const data = await blockUserService(userId, targetUserId as string);

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
      data,
    });


  } catch (err) {

    const errorMessage = err instanceof Error 
    ? err.message 
    : String(err);
    res.status(400).json({ 
      success: false, 
      message: `Failed to block user. ${errorMessage}` 
    });

  }
};