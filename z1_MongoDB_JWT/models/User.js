const mongoose = require("mongoose");

const User = mongoose.model("UserJwt", {
  name: String,
  email: String,
  password: String,
  confirmpassword: String,
});


module.exports = User