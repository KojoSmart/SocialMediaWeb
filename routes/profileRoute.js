const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {createOrUpdateProfile,getMyProfile}=require("../controllers/profileController");

router.post("/profile", authMiddleware, createOrUpdateProfile);
router.get("/myprofile", authMiddleware, getMyProfile);


module.exports = router;