import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import User from "../model/auth.model";
import { AuthRequest } from "../type/req.body";

export const userAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.SECRET_TOKEN!) as jwt.JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    if (decoded.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Access not allowed"
      });
    }

    const userId = decoded.userId;

    const user = await User.findById(userId).select("_id");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    req.userId = userId;

    next();

  } catch {
    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
};