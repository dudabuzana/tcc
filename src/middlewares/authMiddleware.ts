import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, "4f93ac9d10cb751b8c9c646bc9dbccb9");
    const { id } = data as TokenPayload;
    req.userId = id;
    return next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(401);
  }
}
