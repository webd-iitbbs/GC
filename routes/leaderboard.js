const express = require("express");
const Branch = require("../models/Branch");
const Society = require("../models/Society");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());

router.get("/leaderboard", async (req, res) => {
  const branches = await Branch.find().sort({ total: -1 });
  const individuals = await Society.find();
  res.json([branches, individuals]);
});

module.exports = router;
