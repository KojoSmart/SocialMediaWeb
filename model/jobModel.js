const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialUser", // links to the user who created the job post
      required: true,
    },

    jobName: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    salary: {
      type: String, // you can change to Number if you want numeric salaries
    },

    workSetting: {
      type: String,
      enum: ["remote", "on-site", "hybrid"],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    keyResponsibilities: {
      type: [String], // array of strings for responsibilities
      required: true,
    },

    applicationDeadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
