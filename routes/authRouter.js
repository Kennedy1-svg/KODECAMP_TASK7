const express = require('express');
const router = express.Router();
const userCollection = require('../models/userModel')
const userTokenCollection = require("../models/userToken");
const bycrypt = require("bcrypt");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");



router.post("/register", async (req, res, next) => {
  const userDetails = req.body;

  const hashedPassword = bycrypt.hashSync(userDetails.password, 10);

  await userCollection.create({
    fullName: userDetails.fullName,
    email: userDetails.email,
    password: hashedPassword,
    role: userDetails.role,
  });

  res.status(201).send({
    message: "User added successfully",
  });
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userCollection.findOne({ email });

  if (!user) {
    res.send({
      isSuccessful: false,
      message: "User doesn't exist",
    });
    return;
  }

  const doPasswordMatch = bycrypt.compareSync(password, user.password);

  if (!doPasswordMatch) {
    res.status(400).send({
      isSuccessful: false,
      message: "Password Incorrect",
    });
    return;
  }

  const userToken = jwt.sign(
    {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    process.env.AUTH_KEY
  );

  res.status(201).send({
    isSuccessful: true,
    userDetails: {
      fullName: user.fullName,
      email: user.email,
      role: user.role
    },
    userToken,
    message: "Logged in succesfully",
  });
});

router.post("/forgot-password", async (req, res, next) => {
  const { email } = req.body;
  console.log("email that forgot password", email);
  const token = v4();

  const user = await userCollection.findOne({ email });

  if (!user) {
    res.send({
      isSuccessful: false,
      message: "User doesn't exist",
    });
    return;
  }

  await userTokenCollection.create({
    userId: user._id,
    reset_PasswordToken: token,
  });

  console.log("user token collection", userTokenCollection);

  res.status(201).send({
    reset_PasswordToken: token,
    message: "Reset Password token sent",
  });
});


router.post("/reset-password", async (req, res, next) => {
  const { reset_PasswordToken, password } = req.body;
  const userTokenCredential = await userTokenCollection.findOne({
    reset_PasswordToken,
  });

  if (!userTokenCredential) {
    res.send({
      isSuccessful: false,
      message: "Invalid details",
    });
    return;
  }

  const user = await userCollection.findById(userTokenCredential.userId);
  const hashedPassword = bycrypt.hashSync(password, 10);

  await userCollection.findByIdAndUpdate(user._id, {
    password: hashedPassword,
  });

  await userTokenCollection.findOneAndDelete({ reset_PasswordToken });

  res.send({
    message: "Password Changed",
  });
});



module.exports = router;
