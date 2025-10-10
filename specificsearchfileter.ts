export const getAllTeachers = async (
  req: Request<{}, {}, {}, GetAllTeachersQuery>,
  res: Response,
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
      .populate("subjects", "name code") 
      .populate({
        path: "classInchargeOf",          
        select: "name sections",          
        populate: {                        
          path: "sections",
          select: "name",
        },
      })
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
}; in this apis get all there is global filtering now frontend wants particular field filtering that is right what are tellling i am not getting filtering show example name avinash email with some other name like this you explain it to me and implement it clearly 

ChatGPT can make mistakes. Check im
