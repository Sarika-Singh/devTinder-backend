const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");
const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const room = getSecretRoomId(userId, targetUserId);
      console.log(firstName + " Joined the Room : " + room);
      socket.join(room);
    });
    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        try {
          const checkFriend = ConnectionRequest.findOne({
            fromUserId: { $in: [userId, targetUserId] },
            toUserId: { $in: [userId, targetUserId] },
            status: "accepted",
          });
          if (!checkFriend) {
            return req
              .status(403)
              .send("You are not allowed to send message to this user");
          }
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + " Message : " + text);
          //save this message to database

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({ sender: userId, text: text });
          await chat.save();
          io.to(roomId).emit("messageRecieved", { firstName, lastName, text });
        } catch (err) {
          console.error("Error saving message to database: ", err);
        }
      }
    );
    socket.on("disconnect", () => {});
  });
};
module.exports = initializeSocket;
