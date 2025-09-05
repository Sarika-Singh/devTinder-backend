const express = require("express");
const Router = express.Router();
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");

Router.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;
  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate("messages.sender", "firstName lastName emailId profileImage");
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
module.exports = Router;
