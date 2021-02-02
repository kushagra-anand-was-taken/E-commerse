const express = require("express");
const { auth, adminCheck } = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.post("/CreateOrUpdateUser", auth, async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );
  if (user) {
    // console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name,
      picture,
    }).save();
    // console.log("USER CREATED", newUser);
    res.json(newUser);
  }
});

router.post("/currentUser", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/currentAdmin", auth, adminCheck, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
