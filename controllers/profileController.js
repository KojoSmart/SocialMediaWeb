
const Profile = require("../model/profileModel");
const SocialUser = require("../model/userModel");
// Create or Update Profile

const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // user from auth middleware
    const { email, username } = req.body;

    // Check if profile exists for this user
    let profile = await Profile.findOne({ user: userId });

    if (profile) {
      // 🔄 Update existing profile
      profile.email = email || profile.email;
      profile.username = username || profile.username;

      await profile.save();
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile,
      });
    } else {
      // 🆕 Create new profile
      const newProfile = new Profile({
        user: userId,
        email,
        username,
      });

      await newProfile.save();

      // Link profile to user
      await User.findByIdAndUpdate(userId, { profile: newProfile._id });

      return res.status(201).json({
        success: true,
        message: "Profile created successfully",
        profile: newProfile,
      });
    }
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// 🟢 Get Logged-In User Profile
// 
const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId }).populate("user" , "username email");

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


module.exports = {
  createOrUpdateProfile,
  getMyProfile,
};