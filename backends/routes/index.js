const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const projectsModel = require('../models/projectsModel');

const secret = 'secret';

router.post("/signUp", async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailCon = await userModel.findOne({ email: email });
  if (emailCon) {
    return res.json({ success: false, message: "Email already exists" });
  }
  else {

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        let user = userModel.create({
          username: username,
          name: name,
          email: email,
          password: hash
        });

        return res.json({ success: true, message: "User created successfully" });
      });
    });

  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) {
        return res.status(500).json({ success: false, message: "An error occurred while comparing password", error: err });
      }

      if (isMatch) {
        const token = jwt.sign({ email: user.email, userId: user._id }, secret);

        return res.status(200).json({
          success: true,
          message: "User logged in successfully",
          token: token,
          userId: user._id,
        });
      } else {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "An error occurred during login", error: error.message });
  }
});

router.post("/getUserDetails", async (req, res) => {
  const { userId } = req.body;
  const user = await userModel.findOne({ _id: userId });
  if (user) {
    return res.json({ success: true, message: "User detailed fetched successfully", user: user });
  }
  else {
    return res.json({ success: false, message: "User not found" });
  }
});

router.post("/createProject", async (req, res) => {
  const { userId, title } = req.body;
  const user = await userModel.findOne({ _id: userId });

  if (user) {
    const project = await projectsModel.create({
      title: title,
      createdBy: userId
    });

    return res.json({ success: true, message: "Project creates successfully", projectId: project._id });
  }

  else {
    return res.json({ succedd: false, message: 'User not found' });
  }
});


router.post("/getProjects", async (req, res) => {
  const { userId } = req.body;
  const user = await userModel.findOne({ _id: userId });

  if (user) {
    const projects = await projectsModel.find({ createdBy: userId });
    return res.json({ success: true, message: "Project fetched successfully", projects: projects })
  }
  else {
    return res.json({ success: false, message: "User not found" });
  }
});

router.post("/deleteProject", async (req, res) => {
  const { userId, projectId } = req.body;
  const user = await userModel.findOne({ _id: userId });

  if (user) {
    const project = await projectsModel.findOneAndDelete({ _id: projectId });
    return res.json({ success: true, message: "Project deleted successfully" });
  }
  else {
    return res.json({ success: false, message: "User not found" });

  }
});


router.post("/getProject", async (req, res) => {
  const { userId, projectId } = req.body;
  const user = await userModel.findOne({ _id: userId });

  if (user) {
    const project = await projectsModel.findOne({ _id: projectId });
    return res.json({ success: true, message: "Project fetched successfully", project: project });
  }
  else {
    return res.json({ success: false, message: "User not found" });

  }
});


router.post("/updateProject", async (req, res) => {
  const { userId, htmlCode, cssCode, jsCode, projectId } = req.body;
  const user = await userModel.findOne({ _id: userId });

  if (user) {
    const project = await projectsModel.findOneAndUpdate({ _id: projectId }, { htmlCode: htmlCode, cssCode: cssCode, jsCode: jsCode }, { new: true });

    if (project) {
      return res.json({ success: true, message: "Project updated successfully" });
    }
    else {
      return res.json({ success: false, message: "User not found" });
    }
  }
  else {
    return res.json({ success: false, message: "User not found" });
  }
});

module.exports = router;