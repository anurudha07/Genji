import { Router } from "express";
import { userAuth } from "../auth/auth.middleware";
import {
  getMyProfile,
  getProfileById,
  getProfileCard,
  updateProfile,
} from "./profile.controller";

const profileRouter = Router();

// logged in user progile
profileRouter.get("/me", userAuth, getMyProfile);

// create or update profile
profileRouter.put("/me", userAuth, updateProfile);

// someone's full profile, premium locked
profileRouter.get("/:id", userAuth, getProfileById);

// simplified card for explore feed
profileRouter.get("/card/:id", userAuth, getProfileCard);


export default profileRouter;