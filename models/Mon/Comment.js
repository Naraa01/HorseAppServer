const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  createUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  horse: {
    type: mongoose.Schema.ObjectId,
    ref: "Horse",
  },
  comment: {
    type: String,
    // unique: true,
    // validate: {
    //   len: { args: [1, 450], msg: "Name-iin too baga eswel ih baina" },
    // },
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
