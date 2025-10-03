import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITeacher extends Document {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  EmpId: number;
  photoUrl: string;
  classIncharge: Types.ObjectId; 
  subjects: Types.ObjectId[]; 
  experienceCertificate: string;
  experienceDuration: Date;
  exprienceDetails: string;
  identityVerification: string;
  password: string;
  subject: string;
  phoneNumber: string;
}

const teacherSchema: Schema<ITeacher> = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    gender: {
      type: String,
      required: true,
    },
    EmpId: {
      type: Number,
      required: true,
      unique: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    classIncharge: {
      type: Schema.Types.ObjectId, 
      ref: "Class",  
    },
    subjects: [{
      type: Schema.Types.ObjectId, 
      ref: "Subject",  
    }],
    experienceCertificate: {
      type: String,
      required: true,
    },
    experienceDuration: {
      type: Date,
      required: true,
    },
    exprienceDetails: {
      type: String, 
      required: true,
    },
    identityVerification: {
      type: String, 
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false, 
    },
    phoneNumber: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

teacherSchema.set("toJSON", {
  transform: function (doc: mongoose.Document, ret: Partial<ITeacher>) {
    delete ret.password;
    return ret;
  },
});


export default mongoose.model<ITeacher>("Teacher", teacherSchema); check my teacher and validation of this model is right
import Joi from "joi";

export const createTeacherSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  EmpId: Joi.number().required(),
  photoUrl: Joi.string().required(),
  classIncharge: Joi.string().required(),
  subjects: Joi.array().items(Joi.string().length(24)).required(), 
  experienceCertificate: Joi.string().required(),
  experienceDuration: Joi.date().required(),
  exprienceDetails: Joi.string().required(),
  identityVerification:Joi.string().required(),
  password: Joi.string().min(6).required(),
  phoneNumber:  Joi.string().min(10).required(),
});
check this acc to the flow i have shared ypu the details 
ChatGPT said:

Thanks for sharing the updated Teacher schema and Joi validation. I’ve reviewed everything carefully according to TypeScript + Node.js + Mongoose + good backend practices, based on the flow you’ve shared. Here’s a detailed analysis:

1️⃣ Teacher Schema (teacher.model.ts)
classIncharge: {
  type: Schema.Types.ObjectId, 
  ref: "Class",
},
subjects: [{
  type: Schema.Types.ObjectId, 
  ref: "Subject",
}],
password: {
  type: String,
  required: true,
  select: false, 
}

✅ Observations:

ObjectId references:

classIncharge references Class → good, each teacher is in charge of a class.

subjects is an array of ObjectIds referencing Subject → correct for multiple subjects.

Required + unique:

email and EmpId are unique → good for ensuring no duplicates.

photoUrl, experienceCertificate, identityVerification, password all required → ✅ correct.

Password security:

select: false ensures password is never returned in queries unless explicitly requested → ✅ best practice.

Transform in toJSON:

delete ret.password → hides password in API responses → ✅ good.

Timestamps:

timestamps: true → automatically adds createdAt and updatedAt → ✅ correct.

TypeScript types:

Types.ObjectId is used for references → ✅ correct.

subjects: Types.ObjectId[] → allows multiple subjects → ✅ correct.

Additional fields:

phoneNumber added → ✅ correct validation for string with min length in Joi.

2️⃣ Joi Validation (teacher.validation.ts)
subjects: Joi.array().items(Joi.string().length(24)).required()


Ensures subjects array contains valid MongoDB ObjectId strings → ✅ correct.

classIncharge: Joi.string().required() → expects a valid ObjectId from frontend → ✅ correct.

Other fields are validated properly:

email: proper email format.

password: minimum length 6.

phoneNumber: minimum 10 characters (you might also add regex for digits only, optional).

gender: restricted to "male" | "female" | "other" → ✅ correct.

3️⃣ Notes / Recommendations

ClassIncharge and Subjects:

Make sure frontend sends valid MongoDB ObjectId strings for these references.

You might later validate that the IDs actually exist in DB (e.g., check Class exists before saving teacher).

File Uploads:

Currently photoUrl, experienceCertificate, identityVerification are strings.

If using multer/local or cloud storage, ensure req.body contains the uploaded file paths or URLs before validation.

Phone number:

Consider stricter validation: regex for digits only:

Joi.string().pattern(/^[0-9]{10,15}$/).required()


ExperienceDuration:

Using Date type in schema and Joi.date() is correct.

✅ Conclusion

Schema: ✅ Correct for TypeScript + Mongoose + references.

Joi Validation: ✅ Correct for backend validation of required fields and ObjectIds.

Good practices applied:

Password hidden (select: false)

References (ObjectId) for relations

Timestamps enabled

Validation ensures required fields

Next Step: You can now safely implement Teacher CRUD API with file uploads and validation using this schema.

If you want, I can write a full Create Teacher API including multer file upload, Joi validation, and TypeScript types exactly according to this schema, so it’s fully ready for production.

Do you want me to do that?

You said:
yes
ChatGPT said:

Perfect! Based on your Teacher schema, Joi validation, and multer setup, here’s a complete Create Teacher API in TypeScript with proper backend best practices:

1️⃣ Controller: teacher.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import fs from "fs";
import Teacher, { ITeacher } from "../models/teacher.model";
import { createTeacherSchema } from "../validations/teacher.validation";
import { FilterQuery } from "mongoose";

// Extended Request type for multer files
interface MulterFiles {
  photoUrl?: Express.Multer.File[];
  experienceCertificate?: Express.Multer.File[];
  identityVerification?: Express.Multer.File[];
}

export const createTeacher = async (
  req: Request & { files?: MulterFiles },
  res: Response
) => {
  try {
    // 1️⃣ Validate body
    const { error, value } = createTeacherSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((d) => d.message).join(", "),
      });
    }

    const {
      firstname,
      lastname,
      email,
      gender,
      EmpId,
      classIncharge,
      subjects,
      experienceDuration,
      exprienceDetails,
      password,
      phoneNumber,
    } = value;

    // 2️⃣ Check if teacher already exists
    const existingTeacher = await Teacher.findOne({
      $or: [{ email }, { EmpId }],
    });
    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher with this email or EmpId already exists",
      });
    }

    // 3️⃣ Handle file uploads (local paths)
    const photoPath = req.files?.photoUrl?.[0]?.path || "";
    const certPath = req.files?.experienceCertificate?.[0]?.path || "";
    const identityPath = req.files?.identityVerification?.[0]?.path || "";

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create teacher
    const newTeacher = new Teacher({
      firstname,
      lastname,
      email,
      gender,
      EmpId,
      classIncharge,
      subjects,
      experienceDuration,
      exprienceDetails,
      phoneNumber,
      password: hashedPassword,
      photoUrl: photoPath,
      experienceCertificate: certPath,
      identityVerification: identityPath,
    });

    await newTeacher.save();

    // 6️⃣ Respond
    return res.status(201).json({
      success: true,
      teacher: newTeacher,
      message: "Teacher created successfully",
    });
  } catch (err) {
    console.error("Create Teacher Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while creating teacher",
    });
  }
};

2️⃣ Multer Setup: multerConfig.ts
import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.join(__dirname, "../../uploads/teachers");

// Ensure base folder exists
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "others";
    if (file.fieldname === "photoUrl") folder = "photos";
    if (file.fieldname === "experienceCertificate") folder = "certificates";
    if (file.fieldname === "identityVerification") folder = "identity";

    const dest = path.join(UPLOAD_DIR, folder);
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowed = ["image/jpeg", "image/png", "application/zip", "application/pdf"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type"), false);
};

export const upload = multer({ storage, fileFilter });

3️⃣ Route: teacher.routes.ts
import { Router } from "express";
import { createTeacher } from "../controllers/teacher.controller";
import { auth, authorizeRoles } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multerConfig";

const router = Router();

// Single API to create teacher with multiple files
router.post(
  "/create",
  auth,
  authorizeRoles("superAdmin", "admin"),
  upload.fields([
    { name: "photoUrl", maxCount: 1 },
    { name: "experienceCertificate", maxCount: 1 },
    { name: "identityVerification", maxCount: 1 },
  ]),
  createTeacher
);

export default router;

4️⃣ Key Backend Best Practices Applied

TypeScript types:

ITeacher interface, extended Request for req.files.

Validation:

Joi schema ensures all required fields and ObjectIds are correct.

Password hashing:

bcrypt hash applied before saving → security best practice.

File uploads:

Multer fields used for multiple files, separate folders per type.

Paths stored in MongoDB as string URLs.

Duplicate check:

Email and EmpId uniqueness validated before saving.

Error handling:

Try/catch with proper 400/500 responses.

Roles + Auth:

Only superAdmin or admin can create teachers.

Response:

Returns full teacher object except password (select: false).

If you want, I can also provide the Update, Get All (with pagination & search), and Delete Teacher APIs fully in TypeScript following the same best practices, so your Teacher module is fully ready.

Do you want me to do that next?

You said:
yes
ChatGPT said:

Perfect! Let's build the full CRUD for the Teacher module in TypeScript following best backend practices (including pagination, search/filter, update, and delete).

We'll keep password security, multer file handling, validation, TypeScript types, and role-based auth intact.

1️⃣ Get All Teachers (with Pagination & Search)
// controllers/teacher.controller.ts
import { Request, Response } from "express";
import Teacher, { ITeacher } from "../models/teacher.model";
import { FilterQuery } from "mongoose";

interface GetAllTeachersQuery {
  page?: string;
  limit?: string;
  search?: string;
}

export const getAllTeachers = async (
  req: Request<{}, {}, {}, GetAllTeachersQuery>,
  res: Response
) => {
  try {
    const { page = "1", limit = "10", search } = req.query;

    const currentPage = Math.max(Number(page) || 1, 1);
    const perPage = Math.max(Number(limit) || 10, 1);

    const query: FilterQuery<ITeacher> = {};

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ firstname: regex }, { lastname: regex }, { email: regex }];
    }

    const totalTeachers = await Teacher.countDocuments(query);

    const teachers = await Teacher.find(query)
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
      .populate("classIncharge", "name") // populate class name
      .populate("subjects", "name code") // populate subjects
      .lean();

    return res.status(200).json({
      success: true,
      teachers,
      meta: {
        totalTeachers,
        totalPages: Math.ceil(totalTeachers / perPage),
        currentPage,
        perPage,
      },
      message: "Teachers fetched successfully",
    });
  } catch (error) {
    console.error("Get All Teachers Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching teachers",
    });
  }
};

2️⃣ Get Single Teacher by ID
export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id)
      .populate("classIncharge", "name")
      .populate("subjects", "name code")
      .lean();

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      success: true,
      teacher,
    });
  } catch (error) {
    console.error("Get Teacher Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching teacher",
    });
  }
};

3️⃣ Update Teacher
import bcrypt from "bcryptjs";
import fs from "fs";

export const updateTeacher = async (req: Request & { files?: any }, res: Response) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    // Update fields from body
    Object.keys(req.body).forEach((key) => {
      (teacher as any)[key] = req.body[key];
    });

    // Handle optional password update
    if (req.body.password) {
      teacher.password = await bcrypt.hash(req.body.password, 10);
    }

    // Handle file uploads
    if (req.files?.photoUrl) teacher.photoUrl = req.files.photoUrl[0].path;
    if (req.files?.experienceCertificate) teacher.experienceCertificate = req.files.experienceCertificate[0].path;
    if (req.files?.identityVerification) teacher.identityVerification = req.files.identityVerification[0].path;

    await teacher.save();

    return res.status(200).json({
      success: true,
      teacher,
      message: "Teacher updated successfully",
    });
  } catch (error) {
    console.error("Update Teacher Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating teacher",
    });
  }
};

4️⃣ Delete Teacher
export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    await teacher.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    console.error("Delete Teacher Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting teacher",
    });
  }
};

5️⃣ Routes: teacher.routes.ts
import { Router } from "express";
import { auth, authorizeRoles } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multerConfig";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.controller";

const router = Router();

router.post(
  "/create",
  auth,
  authorizeRoles("superAdmin", "admin"),
  upload.fields([
    { name: "photoUrl", maxCount: 1 },
    { name: "experienceCertificate", maxCount: 1 },
    { name: "identityVerification", maxCount: 1 },
  ]),
  createTeacher
);

router.get("/", auth, authorizeRoles("superAdmin", "admin"), getAllTeachers);
router.get("/:id", auth, authorizeRoles("superAdmin", "admin"), getTeacherById);

router.put(
  "/:id",
  auth,
  authorizeRoles("superAdmin", "admin"),
  upload.fields([
    { name: "photoUrl", maxCount: 1 },
    { name: "experienceCertificate", maxCount: 1 },
    { name: "identityVerification", maxCount: 1 },
  ]),
  updateTeacher
);

router.delete("/:id", auth, authorizeRoles("superAdmin", "admin"), deleteTeacher);

export default router;


✅ Best Practices Applied

Pagination & search/filter in getAllTeachers.

Populate refs (classIncharge, subjects) for meaningful data.

Secure password handling with hashing.

File uploads handled for photo, certificate, identity.

Role-based auth applied.

TypeScript types used for Request, Response, and files.

Proper HTTP status codes: 200, 201, 400, 401, 404, 500.

Error handling with detailed logs.

Lean queries for performance where possible.

If you want, I can also provide example Postman requests for all these Teacher APIs with:

Pagination

Filtering

File uploads

Role-based auth header

so you can test everything immediately.

Do you want me to do that next?

You said:
yes
ChatGPT said:

Perfect! Let’s create Postman test examples for all the Teacher APIs you now have. I’ll cover headers, query params, body, and file uploads.

1️⃣ Create Teacher API

Endpoint: POST /api/teachers/create
Auth: Bearer Token (superAdmin/admin)

Headers:

Key	Value
Authorization	Bearer <JWT_TOKEN>
Content-Type	multipart/form-data

Body: form-data

Key	Value	Type
firstname	John	Text
lastname	Doe	Text
email	john@example.com
	Text
gender	male	Text
EmpId	101	Text
classIncharge	<classId>	Text
subjects	<subjectId1>	Text
subjects	<subjectId2>	Text
experienceDuration	2020-05-01	Text
exprienceDetails	5 years teaching experience	Text
password	123456	Text
phoneNumber	9876543210	Text
photoUrl	upload file	File
experienceCertificate	upload file	File
identityVerification	upload file	File

✅ Notes:

Multiple subjects can be sent as repeated keys.

Files are handled via multer middleware.

2️⃣ Get All Teachers (Pagination & Search)

Endpoint: GET /api/teachers
Auth: Bearer Token

Query Params (optional):

Key	Value
page	1
limit	10
search	John

Example URL:

GET /api/teachers?page=1&limit=5&search=John


Response:

{
  "success": true,
  "teachers": [
    {
      "_id": "64f7e1c9...",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john@example.com",
      "classIncharge": { "_id": "...", "name": "10" },
      "subjects": [{ "_id": "...", "name": "Math", "code": "M101" }],
      ...
    }
  ],
  "meta": {
    "totalTeachers": 25,
    "totalPages": 5,
    "currentPage": 1,
    "perPage": 5
  },
  "message": "Teachers fetched successfully"
}

3️⃣ Get Single Teacher

Endpoint: GET /api/teachers/:id
Auth: Bearer Token

Example:

GET /api/teachers/64f7e1c9abcd1234


Response:

{
  "success": true,
  "teacher": {
    "_id": "64f7e1c9abcd1234",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "classIncharge": { "_id": "...", "name": "10" },
    "subjects": [{ "_id": "...", "name": "Math", "code": "M101" }],
    ...
  }
}

4️⃣ Update Teacher

Endpoint: PUT /api/teachers/:id
Auth: Bearer Token

Headers:

Key	Value
Authorization	Bearer <JWT_TOKEN>
Content-Type	multipart/form-data

Body: form-data (only include fields you want to update)

Key	Value	Type
firstname	John Updated	Text
subjects	<subjectId3>	Text
photoUrl	new photo file	File

✅ Notes:

Files are optional; only upload if replacing.

You can update multiple subjects by repeating keys.

5️⃣ Delete Teacher

Endpoint: DELETE /api/teachers/:id
Auth: Bearer Token

Example URL:

DELETE /api/teachers/64f7e1c9abcd1234


Response:

{
  "success": true,
  "message": "Teacher deleted successfully"
}

💡 Tips for Testing in Postman

Bearer Token: Always set Authorization header for all protected routes.

Pagination: Try ?page=2&limit=5 to test page 2.

Filtering: Use ?search=John to filter by firstname/lastname/email.

File Uploads: Always select form-data type and choose File for photoUrl, experienceCertificate, identityVerification.

Update API: Only send the fields you want to change; others remain unchanged.

I can also make a ready-to-import Postman collection JSON for all Teacher APIs with pagination, search, file upload, and auth pre-configured.

Do you want me to create that?
