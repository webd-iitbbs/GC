const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  branch: {
    type: String,
  },
  tech: {
    type: Number,
    default: 0,
  },
  techAbs: {
    type: Number,
    default: 0,
  },
  cult: {
    type: Number,
    default: 0,
  },
  cultAbs: {
    type: Number,
    default: 0,
  },
  sports: {
    type: Number,
    default: 0,
  },
  sportsAbs: {
    type: Number,
    default: 0,
  },
  part: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Branch", branchSchema);
