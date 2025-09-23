exports.getRoles = (req,res) => {
    return res.status(200).json(Object.values(ROLES))
} this is my get roles api now frontend demand show user and admin when there is superadmin and show user only when there is admin
ChatGPT said:

Got it 👍 — right now your API always returns all roles (Object.values(ROLES)), but the frontend needs conditional role exposure depending on who is calling.

Here’s how you can implement it step by step:

1. Define your roles constant (example)
const ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  USER: "user"
};

2. Update your getRoles API

You already have authentication middleware that attaches req.user (decoded JWT) with a role. Based on that, filter what to send back:

exports.getRoles = (req, res) => {
  try {
    const userRole = req.user.role; // coming from JWT middleware

    let availableRoles = [];

    if (userRole === ROLES.SUPERADMIN) {
      // Superadmin can assign admin + user
      availableRoles = [ROLES.ADMIN, ROLES.USER];
    } else if (userRole === ROLES.ADMIN) {
      // Admin can only assign user
      availableRoles = [ROLES.USER];
    } else {
      // Other roles (like user) shouldn't see anything or can be restricted
      availableRoles = [];
    }

    return res.status(200).json({
      success: true,
      roles: availableRoles,
      message: "Roles fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


✅ Logic explained:

If superadmin calls → return [ "admin", "user" ].

If admin calls → return [ "user" ].

If user calls → return [] (or you can deny access).

Do you also want me to show you how to protect this API so only superadmin/admin can call it (using middleware)?

You said:
yes
ChatGPT said:

Perfect 👌 let’s make this industry-style secure so that only superadmin and admin can call getRoles.

We’ll extend your existing auth middleware with a role-based authorization middleware.

1. Auth middleware (you already have this)
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // contains { id, role, ... }
    } catch (error) {
      return res.status(401).json({ success: false, message: "Token invalid" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token invalid" });
  }
};

2. Role-based authorization middleware
const ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  USER: "user"
};

// Only allow certain roles to access
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
    next();
  };
};

3. Your getRoles API with protection
exports.getRoles = (req, res) => {
  try {
    const userRole = req.user.role;
    let availableRoles = [];

    if (userRole === ROLES.SUPERADMIN) {
      availableRoles = [ROLES.ADMIN, ROLES.USER];
    } else if (userRole === ROLES.ADMIN) {
      availableRoles = [ROLES.USER];
    }

    return res.status(200).json({
      success: true,
      roles: availableRoles,
      message: "Roles fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

4. Usage in your routes
const express = require("express");
const router = express.Router();
const { auth, authorizeRoles } = require("../middleware/auth");
const { getRoles } = require("../controllers/roleController");
const ROLES = require("../config/roles");

router.get(
  "/roles",
  auth,
  authorizeRoles(ROLES.SUPERADMIN, ROLES.ADMIN), // only these can access
  getRoles
);

module.exports = router;


✅ Now:

Superadmin → gets [admin, user]

Admin → gets [user]

User → can’t even call this API (403 Forbidden)

Do you also want me to add the signout API + refresh token flow here so that expired tokens don’t allow login (fixing the frontend issue you mentioned earlier)?
