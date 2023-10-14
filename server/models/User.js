const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["true", "Your name is required."]
  },

  password: {
    type: String,
    required: ["true", "Password is required"]
  },
  email: {
    type: String,
    required: ["true", "Email is required"]
  },

});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
