const express = require("express");
const router = express.Router();
const Branch = require("./../models/Branch");

router.get("/final", async (req, res) => {
  const branches = await Branch.find().sort({ total: -1 });
  res.render("final", { branches });
  console.log(branches);
});

module.exports = router;
