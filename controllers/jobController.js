const Job = require("../models/jobModel");
const SocialUser = require("../model/userModel");

// 🟢 Create Job Post
const createJob = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const {
      jobName,
      companyName,
      description,
      salary,
      workSetting,
      location,
      keyResponsibilities,
      applicationDeadline,
    } = req.body;

    const newJob = new Job({
      user: userId,
      jobName,
      companyName,
      description,
      salary,
      workSetting,
      location,
      keyResponsibilities,
      applicationDeadline,
    });

    await newJob.save();

    // Add job to user's jobs array
    await User.findByIdAndUpdate(userId, { $push: { jobs: newJob._id } });

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// 🟡 Get All Job Posts
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("user", "username email");
    res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// 🔵 Get Job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("user", "username email");
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("Get Job Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// 🟣 Update Job (only by owner)
const updateJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    if (job.user.toString() !== userId)
      return res.status(403).json({ success: false, message: "Not authorized" });

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// 🔴 Delete Job (only by owner)
const deleteJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    if (job.user.toString() !== userId)
      return res.status(403).json({ success: false, message: "Not authorized" });

    await job.deleteOne();

    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};


module.exports={
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
}