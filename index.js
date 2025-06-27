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
