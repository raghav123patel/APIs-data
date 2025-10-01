ok not for now one question const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    const token =
      req.headers.Authorization || req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }
    // next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Token invalid",
    });
  }
};

exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Insufficient role",
        });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
}; this is my middleware in js previous now i want to make all in ts so convert and send it back
ChatGPT said:

Perfect 👍 Let’s properly convert your JWT authentication + role-based authorization middleware into TypeScript with good backend practices.

✅ authMiddleware.ts (TypeScript version)
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Extend Express Request type to include user
export interface AuthRequest extends Request {
  user?: JwtPayload | string | any;
}

// 🔹 Authentication middleware
export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Token can be in "Authorization" header as "Bearer <token>"
    const authHeader =
      req.headers.authorization || (req.headers.Authorization as string);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;

    return next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Token is invalid or expired",
    });
  }
};

// 🔹 Authorization middleware
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Insufficient role",
        });
      }
      next();
    } catch (error) {
      console.error("Role Authorization Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
};

🔑 Key Changes in TS version:

Typed Request

We extend Request into AuthRequest so req.user won’t throw type errors.

req.user?: JwtPayload | string | any; because jwt.verify() may return a string or JwtPayload.

Token Extraction

Supports both Authorization (lowercase) and Authorization (capitalized).

Handles tokens like "Bearer <token>".

Strong Typing

All middleware functions have (req, res, next) properly typed.

✅ With this setup, you can now use:

import { auth, authorizeRoles } from "../middleware/authMiddleware";

router.get("/admin-only", auth, authorizeRoles("admin"), controllerFn);


Do you want me to also show you how to make a custom type declaration (express/index.d.ts) so that you don’t need to keep extending Request with AuthRequest everywhere?
