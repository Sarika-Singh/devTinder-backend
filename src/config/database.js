const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://learningmongo:Wa8U1y1tEYXol7Bl@learningmongo.svinzkt.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
