import { AuthRequest } from "../../../type/v1.type";
import { Response } from "express";
import { getFollowersListService, removeFollowerService, respondToFollowRequestService, sendFollowRequestService, unfollowUserService, withdrawalFollowRequestService } from "./follow.service";
import { getPagination } from "../../../util/getPagination";


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



//  respond to follow request 

export const respondToFollowRequest = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const currentUserId = req.userId as string;
    const { targetUserId } = req.params;
    const { action } = req.body; // "accept" or "decline"
 
    if (action !== "accepted" && action !== "declined") {
      res.status(400).json({ 
        success: false, 
        message: "Action must be 'accepted' or 'declined'" 
      });
      return;
    }
 
    const request = await respondToFollowRequestService(currentUserId, targetUserId as string, action);
 
    res.status(200).json({
      success: true,
      message: action === "accepted" ? "Follow request accepted" : "Follow request declined",
      request,
    });

  } catch (err) {

    const errorMessage = err instanceof Error 
    ? err.message 
    : String(err);
    res.status(400).json({ 
      success: false, 
      message: `Failed to respond to request. ${errorMessage}` 
    });

  }
};



// withdrawal follow request

export const withdrawalFollowRequest = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {
    const fromUserId = req.userId as string;
    const { targetUserId } = req.params;
 
    const request = await withdrawalFollowRequestService(fromUserId, targetUserId as string);
 
    res.status(200).json({ 
      success: true, 
      message: "Follow request withdrawn successfully", 
      request 
    });

  } catch (err) {

    const errorMessage = err instanceof Error 
    ? err.message 
    : String(err);
    res.status(400).json({ 
      success: false, 
      message: `Failed to respond to request. ${errorMessage}` 
    });

  }
};
 


// unfollow a user 

export const unfollowUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const fromUserId = req.userId as string;
    const { targetUserId } = req.params;
 
    const follow = await unfollowUserService(fromUserId, targetUserId as string);
 
    res.status(200).json({ 
      success: true, 
      message: "Unfollowed successfully", 
      follow 
    });

  } catch (err) {

    const errorMessage = err instanceof Error 
    ? err.message 
    : String(err);
    res.status(400).json({ 
      success: false, 
      message: `Failed to unfollow user. ${errorMessage}`
    });

  }
};



// remove a follower

export const removeFollower = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const currentUserId = req.userId as string;
    const { targetUserId } = req.params;
 
    const follow = await removeFollowerService(currentUserId, targetUserId as string);
 
    res.status(200).json({ 
      success: true, 
      message: "Follower removed successfully", 
      follow 
    });

  } catch (err) {

    const errorMessage = err instanceof Error 
    ? err.message 
    : String(err);
    res.status(400).json({ 
      success: false, 
      message: `Failed to remove follower. ${errorMessage}` 
    });

  }
};
 


// get followers list

export const getFollowersList = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const currentUserId = req.userId as string;

    const { page, limit, skip } = getPagination(req);
 
    const result = await getFollowersListService(currentUserId, page, limit, skip);
 
    res.status(200).json({ 
      success: true, 
      message: "Followers fetched successfully", 
      ...result 
    });

  } catch (err) {

    const errorMessage = err instanceof Error 
    ? err.message 
    : String(err);
    res.status(500).json({ 
      success: false, 
      message: `Failed to get followers list. ${errorMessage}`
    });

  }
};
 


// get following list

// export const getFollowingList = async (
//   req: AuthRequest,
//   res: Response
// ): Promise<void> => {

//   try {

//     const currentUserId = req.userId as string;

//     const { page, limit, skip } = getPagination(req);
 
//     const result = await getFollowingListService(currentUserId, page, limit, skip);
 
//     res.status(200).json({ 
//       success: true, 
//       message: "Following fetched successfully", 
//       ...result 
//     });

//   } catch (err) {

//     const errorMessage = err instanceof Error 
//     ? err.message 
//     : String(err);
//     res.status(500).json({ 
//       success: false, 
//       message: `Failed to get following list. ${errorMessage}`
//     });

//   }
// };
 