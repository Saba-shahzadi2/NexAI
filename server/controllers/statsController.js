import User from "../models/User.js";

export const getPublicStats = async (req, res) => {
  try {
    const users = await User.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        users,
        uptime: 99.9,
        countries: 1,
        tasks: 0,
      },
    });
  } catch (error) {
    console.error("Get public stats error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
    });
  }
};
