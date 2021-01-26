const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  council: {
    type: String,
  },
  csparticipants: {
    type: Number,
    default: 0,
  },
  csscore: {
    type: Number,
    default: 0,
  },
  eeparticipants: {
    type: Number,
    default: 0,
  },
  eescore: {
    type: Number,
    default: 0,
  },
  ecparticipants: {
    type: Number,
    default: 0,
  },
  ecscore: {
    type: Number,
    default: 0,
  },
  meparticipants: {
    type: Number,
    default: 0,
  },
  mescore: {
    type: Number,
    default: 0,
  },
  ceparticipants: {
    type: Number,
    default: 0,
  },
  cescore: {
    type: Number,
    default: 0,
  },
  mmparticipants: {
    type: Number,
    default: 0,
  },
  mmscore: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Society", societySchema);
