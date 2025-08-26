const express = require("express");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();
const { validateEditProfileData } = require("../utils/validation");
router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid data provided for profile edit");
    }
    const loggedInuser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInuser[key] = req.body[key]));
    await loggedInuser.save();

    res.json({
      message: `${loggedInuser.firstName}, your Profile updated successfully!`,
      data: loggedInuser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = router;
