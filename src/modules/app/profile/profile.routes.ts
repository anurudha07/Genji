import { Router } from "express";
import { userAuth } from "../auth/auth.middleware";
import {
  getMyProfile,
  updateProfile,
} from "./profile.controller";

const profileRouter = Router();

profileRouter.get("/me", userAuth, getMyProfile);
profileRouter.put("/me", userAuth, updateProfile);

export default profileRouter;