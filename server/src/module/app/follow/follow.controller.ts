import { AuthRequest } from "../../../type/v1.type";
import { Response } from "express";
import { sendFollowRequestService } from "./follow.service";


//  send follow request

export const sendFollowRequest = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const fromUserId = req.userId as string;
    const { targetUserId } = req.params;
 
    const request = await sendFollowRequestService(fromUserId, targetUserId as string);
 
    res.status(201).json({ 
        success: true, 
        message: "Follow request sent successfully", 
        request 
    });
  } catch (err) {

    const errorMessage = err instanceof Error 
    ? err.message 
    : String(err);
    res.status(400).json({ 
        success: false, 
        message: `Failed to send request. ${errorMessage}`
    });

  }
};