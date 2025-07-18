Skip to content
You said:
babel nodejs and react me bhoot acche se smjao with full explanation
ChatGPT said:
Zaroor! Chaliye Babel, Node.js, aur React ke context me Babel ko step-by-step aur simple Hindi me samajhte hain, jisse aapka doubt poori tarah clear ho jaye.

🔧 1. Babel Kya Hai?
📌 Definition:
Babel ek JavaScript compiler/transpiler hai jo naye version ke JavaScript code (ES6/ES7/ESNext) ko purane version (ES5) me convert karta hai, taaki vo purane browsers me bhi sahi chale.

🔍 Samjho:
JavaScript ka standard baar-baar update hota rehta hai (ES6, ES7, ES2020, etc.), lekin sabhi browsers naye features ko turant support nahi karte. Isiliye, agar hum modern JS likhte hain (like let, const, arrow functions, class, async/await, etc.), to ye purane browsers me nahi chalega.

👉 Babel ka kaam hai in naye features ko old compatible format me convert karna.

🧠 Babel Kaam Kaise Karta Hai?
Parsing:

Babel aapke JS code ko read karta hai aur ek AST (Abstract Syntax Tree) banata hai.

Transformation:

Us AST ko change karta hai — naye syntax ko purane syntax me badal deta hai.

Code Generation:

Fir final purana-compatible JS code generate karta hai.

🧰 Babel Ka Use React aur Node.js ke saath
🔷 React ke saath:
React me hum JSX use karte hain (jo JavaScript + HTML jaisa syntax hota hai). Browser ise directly samajh nahi sakta.

Example JSX:

const App = () => {
  return <h1>Hello React</h1>;
}
➡️ Browser ise nahi samajhta, to isse transpile karna zaruri hai:

Transpiled code:

const App = () => {
  return React.createElement('h1', null, 'Hello React');
}
👉 Yahi kaam Babel karta hai — JSX ko plain JavaScript me badalta hai.

🔷 Node.js ke saath:
Node.js me agar aap naye JavaScript features (like ES Modules import/export) use karte ho, to kuch features direct support nahi karte (especially purani Node versions me).

Example:

import express from 'express'; // Not supported in older Node.js
Babel ise aise convert karega:

const express = require('express');
📦 Babel Ko Project Me Kaise Use Karte Hain?
React + Babel setup (with Webpack ya Vite):
Agar aap React app bana rahe ho, aur manually Babel use karna chahte ho:

🔹 Step-by-Step Babel Installation:
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react
🔹 Babel Config File (babel.config.json ya .babelrc):
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
🔹 Run Babel CLI to transpile:
npx babel src --out-dir dist
🎯 Summary:
Topic	Explanation
Babel	JavaScript compiler hai jo modern JS + JSX ko purane JS me convert karta hai.
React me	JSX ko JavaScript me badalta hai.
Node.js me	New syntax (like import/export) ko old require syntax me badalta hai.
Use kyun karein?	Taaki code har browser me aur purane environments me bhi chale.
Agar aap chaho to me aapko React + Babel ka ek chhota working example project bana ke bhi de sakta hoon (step by step). Batao agar wo chahiye.

You said:
node me pehle acche se smjao babel ko with full explanation
ChatGPT said:
Bahut achha! Chaliye hum Node.js me Babel ko basic se advanced level tak poori clarity ke saath samajhte hain — ekdam simple bhasha me, examples ke saath.

🧠 1. Node.js me Babel ka role kya hai?
🔍 Problem:
Node.js me hum JavaScript ka backend likhte hain. Ab agar aap latest JavaScript features (like import/export, optional chaining ?., async/await, decorators, etc.) use karna chahte ho — to har Node.js version unhe support nahi karta.

Example:

import express from 'express'; // ❌ Error aayega agar aapne Babel ya `type: "module"` use nahi kiya
Ya phir:

const name = user?.info?.name; // ❌ Optional chaining purane Node.js me nahi chalega
✅ Solution: Babel
Babel Node.js code ko transpile karta hai older JavaScript syntax me, taaki vo code har version me chale (aur error na de).

🔧 2. Babel Node.js me kaise kaam karta hai?
Aap modern JS likhte ho (ES6+ syntax, like arrow functions, modules, async/await, etc.)

Babel us code ko purani JS syntax me convert karta hai (mostly ES5)

Node.js fir use code ko easily run kar pata hai

🔨 3. Step-by-step Babel setup in Node.js
Hum ek simple Node.js app banayenge jo Babel se transpile hoga.

📁 Project structure:
my-app/
│
├── src/
│   └── index.js      (modern JS code)
│
├── dist/             (transpiled code output yahan aayega)
│
├── package.json
└── .babelrc
🧰 Step 1: Init and install dependencies
mkdir my-app
cd my-app
npm init -y
🔧 Step 2: Install Babel
npm install --save-dev @babel/core @babel/cli @babel/preset-env
🛠️ Step 3: Babel config file (.babelrc)
.babelrc file banaye root directory me:

{
  "presets": ["@babel/preset-env"]
}
@babel/preset-env ye automatically decide karega ki code ko kis level tak transpile karna hai based on environment.

🖊️ Step 4: Write modern JS in src/index.js
// src/index.js
const greet = (name = 'Guest') => {
  console.log(`Hello, ${name}!`);
};

greet('Babel User');
🏗️ Step 5: Add build script in package.json
"scripts": {
  "build": "babel src -d dist",
  "start": "node dist/index.js"
}
▶️ Step 6: Build and run
npm run build
npm start
🔥 Aapka code transpile hoke dist/index.js me convert ho gaya hoga. Vo purana JS format me hoga jise Node directly samajhta hai.

🧪 Optional: Babel + nodemon for auto-reload
Agar aap development me ho aur chahte ho ki changes automatic reload ho jayein, to:

npm install --save-dev nodemon @babel/node
Update script:
"scripts": {
  "dev": "nodemon --exec babel-node src/index.js"
}
Isse bina transpile kare aap directly modern JS ko run kar paoge using @babel/node.

🧾 Summary Table
Feature	Without Babel	With Babel
ES6 import/export	❌ Not supported by default	✅ Transpiled to require()
Optional chaining	❌ Old Node versions give error	✅ Supported after transpilation
Async/await in old Node	❌ Error in very old versions	✅ Safe after transpilation
Arrow functions, etc.	Partial support	✅ Fully supported via Babel
JSX support	❌ Not supported	✅ (With @babel/preset-react)
✅ Conclusion:
🔹 Babel in Node.js is like a translator between new JavaScript and older runtime environments.
🔹 Aap modern code likhte ho (jo clean aur future-proof hota hai), Babel usse purane compatible form me badal deta hai.

Agar chaho to me ek ready-to-run GitHub code sample bhi bana ke de sakta hoon. Ya agar aap import/export, decorators, ya TypeScript ke saath Babel use karna chahte ho, to wo bhi alag se samjha sakta hoon.

Bataye, aapko kaunsa part aur deep me chahiye?



Attach

Search

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.
///logout api token blacklisting
  Skip to content
You said:
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide the correct details",
      });
    }

    const user = await User.findOne({ email });
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
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.status(200).json({
      success: true,
      token,
      user,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",  
    });
  }
};  based on this login API how can i make the logout api
ChatGPT said:
Great question! Since your login API issues a JWT token for authentication, the logout flow is a bit different compared to traditional sessions.

Why?
JWTs are stateless — the server does not store them. So “logging out” on the server side usually means:

On the client side, delete or invalidate the token (e.g., remove it from local storage or cookies).

Optionally, on the server side, maintain a blacklist of tokens (to explicitly invalidate tokens before they expire), but this adds complexity.

Simple Logout API
A minimal logout endpoint usually just instructs the client to delete the token. It doesn’t really have to do much on the server side.

exports.logout = (req, res) => {
  // Since JWTs are stateless, server can't "invalidate" a token easily
  // Just send success response and instruct client to delete the token

  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
How to handle logout on the client
Remove the JWT token from wherever you stored it (localStorage, sessionStorage, or cookie).

Redirect user to login or home page.

Optional: Token Blacklisting (advanced)
If you want to truly invalidate tokens on the server side, you can:

Maintain a token blacklist in your database or cache.

On logout, add the token to the blacklist.

On every request, check if the token is blacklisted.

This approach requires more setup but can improve security.

Summary:
For a JWT-based app, your logout API can be simple, and most of the work is on the client side to discard the token.

If you want, I can help you write the client-side logic or explain token blacklisting!

You said:
give me full code how can i make the logout api
ChatGPT said:
Sure! Here’s a full example of a simple logout API in your Node.js/Express setup, based on your JWT login.

1. Basic logout API (stateless, simple):
// logout controller
exports.logout = (req, res) => {
  // Since JWTs are stateless, there's no need to invalidate the token on server side.
  // Just send a response to the client, instructing it to remove the token.
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
2. How you’d wire it up in your Express routes file (e.g., authRoutes.js):
const express = require("express");
const router = express.Router();
const authController = require("./path/to/your/authController");

// Login route (your existing one)
router.post("/login", authController.login);

// Logout route
router.post("/logout", authController.logout);

module.exports = router;
3. Important: On the client side
When the user calls /logout, clear the JWT token stored on the client (in localStorage, cookie, or wherever you keep it).

Example (React):

// After successful logout API call
localStorage.removeItem("token"); // or however you store your token
// redirect user or update UI accordingly
Optional: Token Blacklisting (Advanced)
If you want to invalidate tokens on the server side, you'd need a token blacklist system. Here's a simple approach using an in-memory blacklist (not recommended for production because it resets on server restart):

const blacklist = new Set();

exports.logout = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ success: false, message: "Token missing" });
  }

  blacklist.add(token); // Add token to blacklist
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

// Middleware to check blacklist on every protected route
exports.checkBlacklist = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (blacklist.has(token)) {
    return res.status(401).json({ success: false, message: "Token is invalidated" });
  }
  next();
};
Then use checkBlacklist middleware on protected routes.

But to keep things simple and stateless, just use the first logout example. Let me know if you want me to help you add the blacklist logic or middleware!

You said:
so how logout api are made in project in login functionalities
ChatGPT said:
Great question! How logout is handled depends on the authentication method, but since your login API uses JWTs, here’s how logout is usually done in real projects with JWT-based auth:

1. JWT is stateless — so the server does NOT store session info or tokens.
When a user logs in, server issues a JWT token (like your login API).

Client stores the token (in localStorage, cookie, or memory).

Client sends the token with every request to prove identity.

2. Logout in JWT projects mostly happens on the client side:
Client deletes the JWT token from wherever it’s stored.

Client stops sending that token to the server.

Server treats requests without valid token as unauthorized.

3. Server logout API is often minimal or even unnecessary
Sometimes, server offers a logout endpoint just to provide a clear API.

That endpoint usually does nothing server-side (no session to destroy).

Just responds with success to confirm client can clear its token.

4. If you want to invalidate tokens server-side (advanced)
Keep a token blacklist in database or cache.

On logout, add token to blacklist.

On each protected request, verify token is not blacklisted.

This adds complexity and overhead, but improves security if needed.

Summary: How logout fits in your project
Step	What happens?
User logs in	Server verifies credentials, issues JWT.
User uses app	Client sends JWT with requests.
User logs out	Client deletes JWT token locally.
Server logout API	(Optional) Responds OK; no token invalidation by default.
Example from your project:
Login API: Issues token on successful login.

Logout API:

exports.logout = (req, res) => {
  // No token invalidation needed here for stateless JWT.
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
Client side (React example):

// On logout
localStorage.removeItem("token"); // Remove JWT
// Redirect user or update UI
If you want, I can help you build the full login-logout flow with frontend and backend! Would you like that?

You said:
But to keep things simple and stateless, just use the first logout example. Let me know if you want me to help you add the blacklist logic or middleware!




give me the full explanation of this logic
ChatGPT said:
Absolutely! Let me break down the simple stateless logout logic you mentioned, why it works, and when you might want to use something more complex like token blacklisting.

The Simple Stateless Logout Logic Explained
1. JWT Tokens Are Stateless
JWTs (JSON Web Tokens) are self-contained tokens. They hold all the information the server needs to verify a user (like user ID, expiration time, etc.).

Once the server issues a JWT token on login, it does not store any info about it. It just trusts the token’s signature to verify authenticity.

This means the server does not keep sessions or token state.

2. What Does Logout Mean in This Context?
Since the server doesn’t track tokens, there’s no server-side session to destroy.

So “logging out” basically means the client should stop sending the JWT token with requests.

The server has no way to “invalidate” or “destroy” that token once it’s issued (without extra measures).

3. How Does the Simple Logout API Work?
exports.logout = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
This API simply sends a response back to the client confirming logout.

It does not do anything with the token on the server, because the server can’t modify or revoke a JWT after issuance (in this simple setup).

It is mostly a signal to the client that logout is confirmed.

4. Client Responsibilities
The client (browser, mobile app, etc.) must:

Remove the JWT token from storage (like localStorage, sessionStorage, or cookies).

Stop including the token in future requests.

Once the token is removed client-side, the user is effectively logged out.

5. Why Is This “Simple” and Recommended?
No extra server-side storage or complexity is required.

No database or cache needed to keep track of tokens.

It’s fast, scalable, and works well for many apps.

When Do You Need More Complex Logout (Blacklisting)?
The Problem:
JWT tokens are valid until they expire.

If a token is stolen or you want to log a user out immediately from the server side, the token remains valid until it expires.

This means a stolen token or “logged out” token could still be used to access protected routes until expiration.

Blacklisting Tokens
Maintain a list of tokens that are revoked (blacklist) in your database or cache.

On logout, add the token to the blacklist.

On each protected request, check if the token is blacklisted.

If blacklisted, reject the request.

This forces token invalidation immediately upon logout.

Downsides:
Adds complexity to your system.

Requires storage and lookup on every request.

Less scalable for very large systems unless optimized.

Summary
Aspect	Simple Stateless Logout	Token Blacklisting (Advanced)
Server stores tokens?	No	Yes (blacklist store)
Server invalidates?	No	Yes (on logout, add token to blacklist)
Client responsibility	Remove token from storage	Remove token and server rejects blacklisted tokens
Complexity	Low	Higher
Scalability	High	Medium to low (depends on implementation)
Security	Good, but tokens valid until expiry	Better, tokens invalidated immediately
If you want, I can also provide you code examples for token blacklisting and middleware to check token validity! Just say the word.

You said:
in nodejs how logout api are mae
ChatGPT said:
Got it! Here’s a clear explanation of how logout APIs are made in Node.js depending on the type of authentication you use.

1. Logout API in Node.js for JWT-Based Authentication (Stateless)
Key point:
JWTs are stateless tokens. The server doesn’t store them.

Logout means client deletes the token; server just confirms logout.

Example logout API code:
exports.logout = (req, res) => {
  // No server-side token invalidation needed in this simple setup
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
How it works:
Server responds with success.

Client deletes the token stored in localStorage/cookies.

Client stops sending the token on requests, effectively logging out.

2. Logout API in Node.js for Session-Based Authentication
If your app uses sessions (like with express-session) instead of JWT:

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie('connect.sid'); // clear session cookie
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  });
};
How it works:
Server destroys the session on logout.

Session cookie is cleared.

User must login again for a new session.

3. Optional: Logout API with JWT Token Blacklisting (Advanced)
const blacklist = new Set();

exports.logout = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ success: false, message: "Token missing" });
  }
  blacklist.add(token); // invalidate the token
  return res.status(200).json({ success: true, message: "User logged out successfully" });
};

// Middleware to check blacklist on protected routes
exports.checkBlacklist = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (blacklist.has(token)) {
    return res.status(401).json({ success: false, message: "Token invalidated" });
  }
  next();
};
How it works:
Token added to blacklist on logout.

Middleware rejects blacklisted tokens.

Extra storage and checks needed.

Summary:
Auth Type	Logout Implementation
JWT (stateless)	Client deletes token, server just confirms logout
Session-based	Server destroys session and clears cookie
JWT + Blacklist	Server stores token blacklist, rejects blacklisted tokens
If you want, I can help write the full Express router setup with login and logout, or frontend examples!

You said:
if blacklisted then again how a user login if token is blacklisted
ChatGPT said:
Great question! Here’s how login works if you use token blacklisting for logout:

What happens on logout with blacklisting?
The current token gets added to a blacklist — meaning the server won’t accept it anymore.

But that only blocks that specific token.

How does login work after that?
When the user logs in again, the server generates a brand new JWT token.

This new token is not blacklisted — so it’s valid.

The old blacklisted token stays invalid, so it cannot be reused.

Client replaces the old token with this new token.

Summary:
Step	What happens
User logs out	Old token added to blacklist
User logs in	New token created and sent
User requests	Server verifies token against blacklist
Old token used?	Rejected because blacklisted
New token used?	Accepted
Important notes:
Blacklist only stores invalid tokens — it does NOT block new tokens.

You typically keep tokens blacklisted until they expire, then remove them to save space.

On every protected request, your middleware checks:

Is token valid? (signature, expiry)

Is token blacklisted? If yes → reject request.

If you want, I can help you implement a full login-logout flow with token blacklisting in Node.js! Would you like that?

You said:
yes
ChatGPT said:
Awesome! Let’s build a complete login-logout flow in Node.js with JWT token blacklisting to allow logout that invalidates tokens.

Step-by-step: Login, Logout + Blacklist Middleware
1. Setup: Required packages
npm install express bcryptjs jsonwebtoken dotenv
2. Create an in-memory blacklist (for demo — use Redis or DB for production)
// tokenBlacklist.js
const blacklist = new Set();

function add(token) {
  blacklist.add(token);
}

function has(token) {
  return blacklist.has(token);
}

function remove(token) {
  blacklist.delete(token);
}

module.exports = { add, has, remove };
3. Create middleware to verify tokens and check blacklist
// authMiddleware.js
const jwt = require("jsonwebtoken");
const { has } = require("./tokenBlacklist");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (has(token)) {
    return res.status(401).json({ success: false, message: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
4. Implement login and logout controllers
// authController.js
const User = require("./models/User"); // your user model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { add } = require("./tokenBlacklist");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ success: false, message: "Invalid credentials" });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

    return res.status(200).json({
      success: true,
      token,
      user: { id: user._id, email: user.email }, // only send safe user info
      message: "Logged in successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.logout = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ success: false, message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

  add(token); // blacklist the token

  return res.status(200).json({ success: true, message: "Logged out successfully" });
};
5. Setup Express routes
// routes.js
const express = require("express");
const router = express.Router();
const authController = require("./authController");
const { verifyToken } = require("./authMiddleware");

// Public login route
router.post("/login", authController.login);

// Protected route example
router.get("/profile", verifyToken, (req, res) => {
  res.json({ success: true, message: "This is your profile", userId: req.user.id });
});

// Logout route (protected, requires token)
router.post("/logout", verifyToken, authController.logout);

module.exports = router;
6. Use routes in your main app file
// app.js
require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use("/api/auth", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
How It Works:
Login: User logs in, gets a JWT token.

Protected route: Middleware verifies token and checks if token is blacklisted.

Logout: User calls logout endpoint with the token; server adds token to blacklist.

After logout: If client tries to reuse blacklisted token, server rejects it.

Important notes:
The blacklist here is just an in-memory Set, so it clears if server restarts.

For production, use Redis or database to persist blacklisted tokens.

You can implement periodic cleanup of expired tokens from blacklist.

If you want, I can help you create the User model or give you a frontend example to consume this API! Just ask.

You said:
full code i want
ChatGPT said:
Got it! Here’s a complete, runnable Node.js Express app implementing login, logout with JWT and token blacklisting.

Full working example
Folder structure (suggested)
project/
├─ models/
│   └─ User.js
├─ middleware/
│   └─ authMiddleware.js
├─ utils/
│   └─ tokenBlacklist.js
├─ authController.js
├─ routes.js
├─ app.js
├─ .env
1. .env file (put in project root)
PORT=5000
JWT_SECRET=your_super_secret_key
2. models/User.js (simple Mongoose user model example)
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
3. utils/tokenBlacklist.js
const blacklist = new Set();

function add(token) {
  blacklist.add(token);
}

function has(token) {
  return blacklist.has(token);
}

function remove(token) {
  blacklist.delete(token);
}

module.exports = { add, has, remove };
4. middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { has } = require("../utils/tokenBlacklist");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (has(token)) {
    return res.status(401).json({ success: false, message: "Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token payload (e.g., user id) to request
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
5. authController.js
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { add } = require("./utils/tokenBlacklist");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ success: false, message: "Invalid credentials" });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

    return res.status(200).json({
      success: true,
      token,
      user: { id: user._id, email: user.email },
      message: "Logged in successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.logout = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ success: false, message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

  add(token); // blacklist the token

  return res.status(200).json({ success: true, message: "Logged out successfully" });
};
6. routes.js
const express = require("express");
const router = express.Router();
const authController = require("./authController");
const { verifyToken } = require("./middleware/authMiddleware");

// Public login route
router.post("/login", authController.login);

// Protected route example
router.get("/profile", verifyToken, (req, res) => {
  res.json({ success: true, message: "This is your profile", userId: req.user.id });
});

// Logout route (protected)
router.post("/logout", verifyToken, authController.logout);

module.exports = router;
7. app.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

app.use(express.json());

// Connect to MongoDB (change your connection string accordingly)
mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/auth", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
8. How to create a test user (you need to hash password)
Quick script to create a user:

// createUser.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email: "test@example.com",
    password: hashedPassword,
  });
  await user.save();
  console.log("User created");
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
Run it once with:

node createUser.js
How to test
Start your server: node app.js

Use Postman or curl:

Login

POST http://localhost:5000/api/auth/login
Body: { "email": "test@example.com", "password": "password123" }
Response includes JWT token.

Access protected route

GET http://localhost:5000/api/auth/profile
Headers: Authorization: Bearer <token>
Logout

POST http://localhost:5000/api/auth/logout
Headers: Authorization: Bearer <token>
Try accessing profile again with the same token
It should return unauthorized because token is blacklisted.

If you want me to help with frontend or deployment next, just ask!



Attach

Search

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.


