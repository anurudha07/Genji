import { Router } from "express";
import { userAuth } from "../../../middleware/auth.middleware";
import {
  deletePhoto,
  deletePremiumPhoto,
  getMyProfile,
  getProfileById,
  getProfileCard,
  updateProfile,
  uploadPhoto,
  uploadPremiumPhoto,
} from "../../../controller/profile.controller";
import upload from "../../../middleware/cloudinary.middleware";

const profileRouter = Router();

// logged in user progile
profileRouter.get("/me", userAuth, getMyProfile);

// create or update profile
profileRouter.put("/me", userAuth, updateProfile);

// someone's full profile, premium locked
profileRouter.get("/:id", userAuth, getProfileById);

// simplified card for explore feed
profileRouter.get("/card/:id", userAuth, getProfileCard);

// upload user photos
profileRouter.post("/photo", userAuth, upload.array("photo", 4), uploadPhoto);

// delete uploaded photos
profileRouter.delete("/photo", userAuth, deletePhoto);

// upload premium photo
profileRouter.post("/premium-photo", userAuth, upload.array("premium-photo", 12), uploadPremiumPhoto);

// delete uploaded premium photo
profileRouter.delete("/premium-photo", userAuth, deletePremiumPhoto);

export default profileRouter;