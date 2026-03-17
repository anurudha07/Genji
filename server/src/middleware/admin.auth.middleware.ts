import { Request, Response, NextFunction } from "express";
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

    //  get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Admin auth required"
      });
    }

    const token = authHeader.split(" ")[1];

    //  verify token
    const decoded = jwt.verify(token, env.SECRET_TOKEN!) as { adminId: string, role: string };;

    req.adminId = decoded.adminId;

    //  find user
    const user = await User.findById(decoded.adminId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    //  check admin role
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access denied"
      });
    }

    next();

  } catch (error) {

    const message = error instanceof Error 
    ? error.message 
    : String(error);
    res.status(400).json({ 
        success: false,
        message: `Admin Auth Error: ${message}` 
    });
  }
};