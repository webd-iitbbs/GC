const express = require("express");
const Branch = require("../models/Branch");
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());

router.get( "/leaderboard", async (req, res) => {
  const branches = await Branch.find().sort({ total: -1 });
  res.json( branches );
});

module.exports = router;
