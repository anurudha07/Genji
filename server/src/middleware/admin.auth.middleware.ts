import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/auth.model"
import env from "../config/env";
import { AdminRequest } from "../type/v1.type";

export const adminAuth = async (
  req: AdminRequest, 
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

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access not allowed"
      });
    }

    const adminId = decoded.userId;

    const user = await User.findById(adminId).select("_id");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    req.adminId = adminId;

    next();

  } catch {
    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
};