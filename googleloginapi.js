now one more question how to create the google login api in project this are
const User = require("../models/userModel");
const  ROLES = require("../staticfiles/roles");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async(req,res) => {
    try{
      const {firstName, lastName, email, password} = req.body;
      if(!firstName || !lastName || !email || !password ){
        return res.status(400).json({
        success: false,
        message: "Please provide the correct details",
      });  
      }
      const alreadyExist = await User.findOne({email});
      if(alreadyExist) {
        return res.status(400).json({
        success: false,
        message: "user already exist",
      });   
      }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: ROLES.user,  
    })
    return res.status(200).json({
        success: true,
        user,
        message: "user registered successfully"

    })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}  


exports.login = async(req,res) => {
    try {
      const {email, password} = req.body;
      if(!email || !password) {
        return res.status(401).json({
            success: false,
            message: "provide all credentials",
        })
      }
      const user = await User.findOne({email}).select("+password");
      console.log(user);
       if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
     const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
     return res.status(200).json({
      success: true,
      token,
      user,
      message: "User logged in successfully",
    });
    } catch(error) {
      console.log(error); 
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      })
    }
} these are my apis and in future if google login is demanded so how to create this
ChatGPT said:

Great question 👍 this is a very common situation in real corporate projects.
Right now your register and login APIs are purely email + password based with bcrypt + jwt.

If the frontend later demands Google login, you don’t change your existing flow, you just add an OAuth-based login route. Let me break it down like an expert backend dev:

🔑 How Google Login Works

On frontend (React/Next.js/Angular etc.), user clicks "Sign in with Google".

Google provides an ID Token (JWT signed by Google).

This comes from Google’s OAuth 2.0 / OpenID Connect.

You never get the password from Google.

Frontend sends this ID Token to your backend.

Your backend:

Verifies the token with Google API.

If valid → extracts email, name, profile info.

Then → creates or finds the user in your DB.

Finally → generates your own JWT (so your system still works the same).

🛠️ Implementation in Your Node.js + MongoDB Project
1. Install dependency
npm install google-auth-library

2. Create Google Login Controller
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ROLES = require("../staticfiles/roles");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;  // frontend sends Google ID token

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google token is required",
      });
    }

    // 1. Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload(); // gives email, name, sub (googleId)
    const { email, given_name, family_name, sub } = payload;

    // 2. Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user without password
      user = await User.create({
        firstName: given_name || "Google",
        lastName: family_name || "User",
        email,
        password: "", // not needed for Google users
        role: ROLES.user,
        googleId: sub, // optional, store google user id
      });
    }

    // 3. Create your own JWT
    const authToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    return res.status(200).json({
      success: true,
      token: authToken,
      user,
      message: "User logged in with Google successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};

3. Update User Model (Optional)

Add googleId field for tracking:

googleId: {
  type: String,
  unique: true,
  sparse: true,
}

4. Route
router.post("/google-login", userController.googleLogin);

✅ Key Points

Email/password users still work as before.

Google users skip password but still get JWT from your backend.

You maintain one unified JWT system for all logins.

If later you add Facebook, GitHub, LinkedIn → just repeat same pattern.

⚡Tip from real projects:

Always verify Google ID Token at backend (never trust frontend).

Keep googleId in DB → helps avoid duplicate accounts.

Don’t force password for Google users (leave blank or null).

👉 Do you want me to also show you the frontend (Next.js) integration example, i.e., how to get the Google ID token and send it to your /google-login API?

You said:
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ROLES = require("../staticfiles/roles");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;  // frontend sends Google ID token

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google token is required",
      });
    }

    // 1. Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload(); // gives email, name, sub (googleId)
    const { email, given_name, family_name, sub } = payload;

    // 2. Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user without password
      user = await User.create({
        firstName: given_name || "Google",
        lastName: family_name || "User",
        email,
        password: "", // not needed for Google users
        role: ROLES.user,
        googleId: sub, // optional, store google user id
      });
    }

    // 3. Create your own JWT
    const authToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    return res.status(200).json({
      success: true,
      token: authToken,
      user,
      message: "User logged in with Google successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
}; this is a separate api apart from the logi api yes or no 
ChatGPT said:

✅ Yes — this is a separate API from your normal login API.

Your existing login API → works with email + password (manual authentication).

The new googleLogin API → works with a Google ID token (OAuth authentication).

Both ultimately issue a JWT from your backend, but the way the user is authenticated differs.

👉 In real projects, you keep both, because some users will log in with email/password and others with Google (or even both).

Would you like me to also show you how to merge both flows into a single unified login system (where backend decides if it’s password or Google)?
