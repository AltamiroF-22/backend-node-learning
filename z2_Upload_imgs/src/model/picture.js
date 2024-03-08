const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Picture", PictureShema);
