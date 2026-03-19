import Follow from "../model/follow.model";
import { FOLLOW_STATUS } from "../constant/follow.constant";

export const deleteOldDeclinedRequest = async ()
: Promise<void> => {

  //  72 hours ago
  const time = new Date(Date.now() - 72 * 60 * 60 * 1000);

  // delete old declined follow documents
  await Follow
  .deleteMany({
    status: FOLLOW_STATUS.DECLINED,
    updatedAt: { $lt: time },
  });
};