import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
const jwtSecretToken = String(process.env.JWT_SECRET_TOKEN as string);

export const handleErrors = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "An unknown error occurred.",
    });
  }
};

export interface CustomRequest extends Request {
  user?: any;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader as string; // Cast authHeader to a string

    jwt.verify(
      token.split(" ")[1],
      jwtSecretToken,
      async (err: unknown, user) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: "Token is not valid",
          });
        }

        req.user = user;
        const _user = await User.findById(req.user.userId);
        req.user = _user;

        next(); // Call next() to proceed to the next middleware
      }
    );
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not authenticated",
    });
  }
};

export const verifyTokenAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    try {
      if (req.user) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: "you are not allowed to perform this operation",
        });
      }
    } catch (error) {
      handleErrors(error, res);
    }
  });
};
