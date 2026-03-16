import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../../../config/env";
import { AdminRequest } from "../../../type/v1.type";

export const adminAuth = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
): void => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Admin login required" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.SECRET_TOKEN) as { adminId: string };

    req.adminId = decoded.adminId;

    next();

  } catch (err) {

    const errorMessage =
      err instanceof Error ? err.message : String(err);

    res.status(401).json({
      message: `Admin auth error: ${errorMessage}`,
    });

  }
};