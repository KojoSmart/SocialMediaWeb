const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialUser",
      required: true,
    },
   
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
   
    // phone: {
    //   type: String,
    //   trim: true,
    // },
    
    // avatarUrl: {
    //   type: String,
    //   trim: true,
    // },
    // socialLinks: {
    //   website: { type: String },
    //   linkedin: { type: String },
    //   github: { type: String },
    //   twitter: { type: String },
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
