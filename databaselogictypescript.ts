Step 6: Database Connection

src/config/database.ts

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user.model";
import { ROLES } from "../staticfiles/roles";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("MongoDB Atlas connection successful");

    const superadminEmail = process.env.SUPERADMIN_EMAIL!;
    const superadminPassword = process.env.SUPERADMIN_PASSWORD!;

    const existing = await User.findOne({ email: superadminEmail });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(superadminPassword, 10);
      const superadmin = new User({
        firstName: "Super",
        lastName: "Admin",
        email: superadminEmail,
        password: hashedPassword,
        role: ROLES.superAdmin,
      });
      await superadmin.save();
      console.log("Superadmin created successfully");
    } else {
      console.log("Superadmin already exists with role:", existing.role);
    }
  } catch (error) {
    console.error("Database connection or superadmin creation failed:", error);
  }
};

export default connectDB; explain this step also with above i think its same as js apart from export and import or anything explain it properly
ChatGPT said:

Absolutely! Let’s break down Step 6: Database Connection in your TypeScript backend and compare it carefully to your JS version, so you can clearly see the TS differences.

1️⃣ The code
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user.model";
import { ROLES } from "../staticfiles/roles";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("MongoDB Atlas connection successful");

    const superadminEmail = process.env.SUPERADMIN_EMAIL!;
    const superadminPassword = process.env.SUPERADMIN_PASSWORD!;

    const existing = await User.findOne({ email: superadminEmail });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(superadminPassword, 10);
      const superadmin = new User({
        firstName: "Super",
        lastName: "Admin",
        email: superadminEmail,
        password: hashedPassword,
        role: ROLES.superAdmin,
      });
      await superadmin.save();
      console.log("Superadmin created successfully");
    } else {
      console.log("Superadmin already exists with role:", existing.role);
    }
  } catch (error) {
    console.error("Database connection or superadmin creation failed:", error);
  }
};

export default connectDB;

2️⃣ Comparison with JS version
Feature	JS version	TS version
Imports	const mongoose = require("mongoose");	import mongoose from "mongoose"; (ES Module syntax)
dotenv	require("dotenv").config();	import dotenv from "dotenv"; dotenv.config();
User model import	const User = require("../models/userModel");	import User from "../models/user.model";
ROLES import	const ROLES = require("../staticfiles/roles");	import { ROLES } from "../staticfiles/roles";
Environment variables	process.env.MONGODB_URL	process.env.MONGODB_URL! (notice the !)
Export function	module.exports = connectWithDb;	export default connectDB;
3️⃣ TypeScript-specific differences
a) Non-null assertion operator !
process.env.MONGODB_URL!
process.env.SUPERADMIN_EMAIL!
process.env.SUPERADMIN_PASSWORD!


Reason: TypeScript considers process.env.* as possibly undefined (type: string | undefined).

Using ! tells TS: “I know this will not be undefined at runtime, trust me.”

✅ This is safe here because you must define these in your .env for the backend to work.

b) import vs require

TS allows ES Module syntax (import/export) which is cleaner and type-safe.

JS uses require/module.exports.

In TS, using import also gives type inference for imported modules.

c) async/await

Same in JS and TS.

TS can also infer the return type of connectDB automatically as Promise<void>.

d) Type safety

When creating superadmin:

const superadmin = new User({
  firstName: "Super",
  lastName: "Admin",
  email: superadminEmail,
  password: hashedPassword,
  role: ROLES.superAdmin,
});


TypeScript knows User is a Mongoose model with a schema.

TS will check that firstName, lastName, email, password, role exist and are correct types.

This prevents mistakes that JS would allow (like accidentally passing role: 123).

4️⃣ Step-by-step flow (same as JS)

Import necessary modules (mongoose, bcrypt, dotenv, User, ROLES).

Load .env using dotenv.config().

Connect to MongoDB Atlas with mongoose.connect().

Check if superAdmin already exists:

If yes → log it.

If no → hash password and create new superAdmin user.

Log success or error.

Export the function for use in index.ts.

5️⃣ TL;DR

Logic is the same as JS; the differences are mostly TypeScript syntax & type safety:

import/export instead of require/module.exports.

Non-null assertion ! for env variables.

TS checks that the User object conforms to schema types.

Optional type checking at compile time prevents runtime bugs.

If you want, I can rewrite your full index.ts file in TS and connect this database properly, showing how the server startup integrates with TypeScript types.

Do you want me to do that next?
