Skip to content
Chat history

You said:
exports.getUsers = async(req,res) => {
  try{
    let {page =1, limit = 10} = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    if(page < 1) page=1;
    const totalUsers = await User.countDocuments();
    const users = await User.find({})
          .skip((page -1) * limit)
          .limit(limit)
          .sort({createdAt: -1})
    return res.status(200).json({
      success: true,
      users,
      meta: {
        totalUsers,
        totalPages : Math.ceil(totalUsers/limit),
        currentPage: page,
        perPage: limit,

      },
      message: "users fetched successfully",
    })      
  } catch(error) {  
    return res.status(500).json({
      success: false, 
      message: "Internal Server Error",
    });
  }
} now in this getall api frontend requirement is when admin login only user show and when superadmin all the data will show and when user all should see so what is the approach complete it with modified apis 
ChatGPT said:
Got it! You want to modify your getUsers API so that it returns different sets of users based on the role of the logged-in user:

Admin → can see only user role data

Superadmin → can see all users

User → can see all users

Here’s a clean approach:

Get the logged-in user's role (assume you already have authentication middleware that sets req.user with role and _id).

Filter the query based on the role.

Keep pagination intact.

Here’s the modified API:

exports.getUsers = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    if (page < 1) page = 1;

    // Determine query based on logged-in user's role
    let query = {};
    const loggedInRole = req.user.role; // from auth middleware
    if (loggedInRole === 'admin') {
      query.role = 'user'; // admin sees only users
    } else if (loggedInRole === 'superadmin') {
      query = {}; // superadmin sees all
    } else if (loggedInRole === 'user') {
      query = {}; // user sees all
    }

    const totalUsers = await User.countDocuments(query);
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      users,
      meta: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        perPage: limit,
      },
      message: "Users fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
✅ Key Points / Approach:

Role-based filtering: Use query.role to filter data depending on logged-in user's role.

Authentication middleware: Must populate req.user with _id and role.

Pagination: Works as before with .skip() and .limit().

Sorting: Always returns the latest users first (createdAt: -1).

If you want, I can also enhance this API to allow admin to see only their own created users, and superadmin sees all, including admins, which is even more corporate-ready.

Do you want me to do that version too?



No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.
