const express = require("express");
const router = express.Router();
const authMiddleware = rewuire("../middlewares/authMiddleware");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
}=require("../controllers/jobController");

router.post("/jobs", authMiddleware, createJob);
router.get("/jobs", getAllJobs);
router.get("/jobs/:id", getJobById);
router.put("/jobs/:id", authMiddleware, updateJob);
router.delete("/jobs/:id", authMiddleware, deleteJob);

module.exports = router;
