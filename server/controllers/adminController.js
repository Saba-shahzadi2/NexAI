import User from "../models/User.js";
import Contact from "../models/Contact.js";

// =====================================================
// Admin Dashboard Statistics
// =====================================================
export const getAdminStats = async (req, res) => {
  try {
    const [totalUsers, totalContacts, recentUsers, recentContacts] =
      await Promise.all([
        // Count everyone except admins.
        // This also includes old users that don't have a role field.
        User.countDocuments({
          role: { $ne: "admin" },
        }),

        Contact.countDocuments(),

        User.find({
          role: { $ne: "admin" },
        })
          .select("_id name email role createdAt")
          .sort({ createdAt: -1 })
          .limit(5),

        Contact.find()
          .select("_id name email message createdAt")
          .sort({ createdAt: -1 })
          .limit(5),
      ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalContacts,
      },
      recentUsers,
      recentContacts,
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// Get All Users
// =====================================================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $ne: "admin" },
    })
      .select("_id name email role createdAt updatedAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// Get All Contact Messages
// =====================================================
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .select("_id name email message createdAt updatedAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error("Get Contacts Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// Delete User
// =====================================================
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOneAndDelete({
      _id: id,
      role: { $ne: "admin" },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// Delete Contact Message
// =====================================================
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully",
    });
  } catch (error) {
    console.error("Delete Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// TEMPORARY: Make Current User Admin
// =====================================================
// Use only for initial admin setup.
// We will remove this after admin setup is complete.
export const makeCurrentUserAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          role: "admin",
        },
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("_id name email role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User promoted to admin",
      user,
    });
  } catch (error) {
    console.error("Make Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
