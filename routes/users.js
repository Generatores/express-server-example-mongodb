const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getUser, async (req, res) => {
  res.json(res.functionUser);
});

router.post("/", async (req, res) => {
  const UserReceived = new User({
    user: req.body.user,
    password: req.body.password,
  });
  try {
    const newUser = await UserReceived.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.functionUser.name = req.body.name;
  }
  if (req.body.password != null) {
    res.functionUser.password = req.body.password;
  }
  try {
    const updatedUser = await res.functionUser.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.functionUser.remove();
    res.json({ message: "Deleted User successfully..." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let functionUser;
  try {
    functionUser = await User.findById(req.params.id);
    if (functionUser == null) {
      return res.status(404).json({ message: "Cannot find User..." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.functionUser = functionUser;
  next();
}

module.exports = router;
