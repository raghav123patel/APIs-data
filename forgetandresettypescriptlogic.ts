ok i have shared you everything now i want to create a forget password api using the nodemailer in typescript this project so create it acc to the  best backend practice and explain it clearly
ChatGPT said:

Perfect! Let's build a Forget Password / Reset Password flow in your TypeScript Node.js + Express project. I’ll structure it following best backend practices and integrate nodemailer for email sending.

We will split this into proper steps: Controller, Routes, Validation, Service, and Mailer Setup.

Step 1: Install Nodemailer
npm install nodemailer
npm install @types/nodemailer -D

Step 2: Setup Mailer Utility

Create a folder src/utils and file mailer.ts:

// src/utils/mailer.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // e.g., smtp.gmail.com
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,                     // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: `"School System" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Email not sent");
  }
};


✅ Explanation:

nodemailer.createTransport configures SMTP.

sendEmail is a reusable function.

.env should have:

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@gmail.com
SMTP_PASS=yourpassword
FRONTEND_URL=http://localhost:3000

Step 3: Add Reset Token Field to User Model

Update auth.model.ts:

import mongoose, { Schema, Document } from "mongoose";
import { ROLES, Role } from "../staticfiles/roles";

export interface IUser extends Document {
  email: string;
  password?: string;
  role: Role;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(ROLES) },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.resetPasswordToken;
    return ret;
  },
});

export default mongoose.model<IUser>("User", userSchema);


✅ Explanation:

resetPasswordToken: token sent to user via email.

resetPasswordExpire: expiry timestamp for token.

toJSON hides password and resetPasswordToken in responses.

Step 4: Validation

Create auth.validation.ts:

import Joi from "joi";

export const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});


✅ Explanation:

Separate validation for requesting reset and actually resetting password.

Step 5: Create Controller

Create auth.controller.ts functions:

import { Request, Response } from "express";
import User from "../models/auth.model";
import crypto from "crypto";
import { sendEmail } from "../utils/mailer";
import bcrypt from "bcrypt";
import { forgetPasswordSchema, resetPasswordSchema } from "../validations/auth.validation";

// 1️⃣ Request Password Reset
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { error, value } = forgetPasswordSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.message });

    const { email } = value;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and set expire
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
      <p>You requested a password reset</p>
      <p>Click <a href="${resetUrl}">here</a> to reset your password</p>
      <p>This link expires in 1 hour</p>
    `;

    await sendEmail(user.email, "Password Reset Request", message);

    res.status(200).json({ success: true, message: "Reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2️⃣ Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { error, value } = resetPasswordSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.message });

    const { token, password } = value;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: new Date() },
    });

    if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


✅ Explanation / Best Practices:

Token is hashed in DB for security.

Token expires after 1 hour.

Password is hashed before saving.

API does not expose sensitive info.

Step 6: Add Routes

Create auth.routes.ts:

import { Router } from "express";
import { forgotPassword, resetPassword, login } from "../controllers/auth.controller";

const router = Router();

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;

Step 7: Frontend URL

process.env.FRONTEND_URL is used to generate a clickable link in email.

Example: http://localhost:3000/reset-password/<token>

✅ Step 8: Environment Variables

Make sure .env has:

MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SUPERADMIN_EMAIL=superadmin@example.com
SUPERADMIN_PASSWORD=superadminpassword
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password_or_app_password
FRONTEND_URL=http://localhost:3000


This gives you a secure, TypeScript-friendly, best practice password reset flow.

I can also provide a full working test-ready Postman collection for your login + forgot-password + reset-password API endpoints if you want.

Do you want me to create that next?
