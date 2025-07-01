//login and register apis

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const imagekit = require("../utils/imagekit");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "Image is required" });

    const isExist = await User.findOne({ email });
    if (isExist)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadedImage = await imagekit.upload({
      file: file.buffer, //  for multer buffer
      fileName: `${Date.now()}_${file.originalname}`,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      imageUrl: uploadedImage.url,
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//multer setup

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;

//routes setup
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");
const upload = require("../middlewares/upload");

router.post("/register", upload.single("image"), register);
router.post("/login", login);

module.exports = router; 

To deploy your Node.js (Express + MongoDB) backend to Vercel and send Postman-compatible API documentation to the frontend team, follow these steps:

🧑‍💻 1. Prepare Your Project for Vercel
Vercel is optimized for frontend frameworks, but you can still deploy an Express backend using Vercel Serverless Functions.

✅ Project Structure (Recommended)
bash
Copy
Edit
/api
  └── index.js        # Your Express app entry
/vercel.json          # Vercel config
/package.json
✅ api/index.js (Convert Express app to work with Serverless)
js
Copy
Edit
const express = require('express');
const { default: serverless } = require('serverless-http');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);

// Define routes
app.post('/api/example', async (req, res) => {
  res.json({ message: 'POST API working' });
});

module.exports = app;
module.exports.handler = serverless(app);
✅ vercel.json (Route config)
json
Copy
Edit
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "api/index.js" }
  ]
}
🚀 2. Deploy to Vercel
Initialize git repo (if not already):

bash
Copy
Edit
git init
git add .
git commit -m "Initial commit"
Push to GitHub (or GitLab/Bitbucket).

Go to vercel.com and:

Import your project from GitHub.

Set Environment Variables, especially MONGO_URI.

Click Deploy.

📄 3. Generate and Share Postman API Docs
✅ Option 1: Use Postman to Manually Export Docs
Open Postman.

Create a new collection for your API.

Add your POST endpoints (like https://your-vercel-app.vercel.app/api/your-endpoint).

Click on the collection → "Export" → Choose Collection v2.1.

Send the .json file to frontend or upload to a shared drive.

✅ Option 2: Host API Docs on Postman Cloud
Click "Share Collection" → "Via Link".

Postman will generate a public link (e.g., https://documenter.getpostman.com/view/...).

Send that link to your frontend team.

📌 Notes
MongoDB should be hosted (e.g., on MongoDB Atlas), as Vercel doesn't persist data.

Avoid long-running connections—Vercel functions spin up per request, so connect to MongoDB inside the function or manage reuse with global variables.

If you want, I can help you:

Write the actual Vercel-ready Express code.

Generate a sample Postman collection file for your endpoints.

Just upload your existing code or describe your endpoints.




Ask ChatGPT

