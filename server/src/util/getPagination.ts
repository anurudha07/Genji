import { AuthRequest } from "../type/req.body";

export const getPagination = (
  req: AuthRequest
): { page: number; limit: number; skip: number } => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Number(req.query.limit) || 20);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};