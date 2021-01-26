const express = require("express");
const router = express.Router();
const Branch = require("../models/Branch");

router.get("/leaderboard", async (req, res) => {
  const branches = await Branch.find().sort({ total: -1 });
  res.render("leaderboard", { branches });
});

module.exports = router;
