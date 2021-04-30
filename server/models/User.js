const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  // adding a credits property with default value of 0
  credits: { type: Number, default: 0 },
});

mongoose.model("users", userSchema);
