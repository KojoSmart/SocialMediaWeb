const SocialUser = require("../model/userModel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();




// Register a new user

const signUp = async (req, res) => {
  const { username, email, password,  } = req.body;
  try {
    const userExists = await SocialUser.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: " User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await SocialUser.create({
      username,
      email,
      password: hashPassword,
      
    });
    await user.save();

    // Send welcome email
    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   ...signupMailTemplate(username),
    // };

   
    // await mailTransporter.sendMail(mailOptions);

    res.status(201).json({
      message: "User registered successfully",
      user: { username: user.username, email: user.email  },
    });
  } catch (error) {
    console.error("Error in register function:", error); // this logs the error
    res.status(500).json({ message: "Something went wrong" });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await SocialUser.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credential",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      token: token,
      user: { username: user.username, email: user.email  },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signUp,
    login,
}