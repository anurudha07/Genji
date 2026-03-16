import { Router } from "express";
import authRouter from "./admin.auth.route";

const adminRouter = Router();

adminRouter.use('/auth',authRouter)

export default adminRouter;