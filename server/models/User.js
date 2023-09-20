const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: ["true", "First name is required."]
  },
  last_name: {
    type: String
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
