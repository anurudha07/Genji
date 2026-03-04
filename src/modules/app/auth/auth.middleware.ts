import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../../../config/env";
import { AuthRequest } from "../../../types/v1.types";



export const userAuth = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    try {

        const authHeader = req.headers.authorization;

        // no token
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: "Login required" });
            return;
        }

        const token = authHeader.split(" ")[1];

        const secret = env.SECRET_TOKEN;

        if (!secret) {
            throw new Error('SECRET_TOKEN is not defined in environment variables');
        }

        const decoded = jwt.verify(token, secret) as { userId: string };

        req.userId = decoded.userId;

        next();
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        res.status(401).send(`Auth middleware Error: ${errorMessage}`);
    }
};