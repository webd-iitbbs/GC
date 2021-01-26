const express = require("express");
const Society = require("./../models/Society");
const Branch = require("./../models/Branch");
const router = express.Router();

createBranches();

router.get("/score", async (req, res) => {
  res.render("score");
});

router.get("/participants", async (req, res) => {
  res.render("participants");
});

router.post("/inputScore", async (req, res) => {
  try {
    const branch = req.body.branch;
    const societyName = req.body.societyName;
    const score = req.body.score;
    const society = await Society.findOne({ name: societyName });
    if (!society) {
      let result = await Society.create(
        createSocietyWithScore(societyName, branch, score),
        () => {
          updateScore(societyName);
        }
      );
      console.log(result);
    } else {
      society.set(createSocietyWithScore(societyName, branch, score));
      await society.save(() => {
        updateScore(societyName);
      });
    }

    // await updateScore(societyName);
    res.redirect("/score");
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

router.post("/inputParticipants", async (req, res) => {
  try {
    const branch = req.body.branch;
    const societyName = req.body.societyName;
    const noOfParticipants = req.body.noOfParticipants;
    const society = await Society.findOne({ name: societyName });
    if (!society) {
      let result = await Society.create(
        createSocietyWithParticipants(societyName, branch, noOfParticipants),
        () => {
          updateParticipants();
        }
      );
      console.log(result);
    } else {
      society.set(
        createSocietyWithParticipants(societyName, branch, noOfParticipants)
      );
      await society.save(() => {
        updateParticipants();
      });
    }
    res.redirect("/participants");
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

// Updating Normalized score
async function updateScore(societyName) {
  const council = getCouncil(societyName);
  const societies = await Society.find({ council });
  let totalCsScore = 0,
    totalEcScore = 0,
    totalEeScore = 0,
    totalCeScore = 0,
    totalMeScore = 0,
    totalMmScore = 0;
  for (let society of societies) {
    totalCsScore += society.csscore;
    totalEcScore += society.ecscore;
    totalEeScore += society.eescore;
    totalMeScore += society.mescore;
    totalCeScore += society.cescore;
    totalMmScore += society.mmscore;
  }
  let totalScores = [
    totalCsScore,
    totalEcScore,
    totalEeScore,
    totalMeScore,
    totalCeScore,
    totalMmScore,
  ];
  let max = Math.max(...totalScores);
  let normalizedScores = totalScores.map((value) => {
    return Math.ceil((value / max) * 100);
  });
  let branchValues = ["cs", "ec", "ee", "me", "ce", "mm"];
  let keyValueBranches = normalizedScores.reduce(function (
    result,
    field,
    index
  ) {
    result[branchValues[index]] = field;
    return result;
  },
  {});
  let branchDocs = await Branch.find();
  console.log(keyValueBranches);
  console.log(branchDocs);
  for (let index in keyValueBranches) {
    for (let eachBranch of branchDocs) {
      if (eachBranch.branch == index) {
        if (council == "tech") {
          eachBranch.set({ tech: keyValueBranches[index] });
          await eachBranch.save();
        } else if (council == "cult") {
          eachBranch.set({ cult: keyValueBranches[index] });
          await eachBranch.save();
        } else if (council == "sports") {
          eachBranch.set({ sports: keyValueBranches[index] });
          await eachBranch.save();
        }
      }
    }
  }
}

async function updateParticipants() {
  const societies = await Society.find();
  let totalCs = 0,
    totalEc = 0,
    totalEe = 0,
    totalCe = 0,
    totalMe = 0,
    totalMm = 0;
  for (let society of societies) {
    totalCs += society.csparticipants;
    totalEc += society.ecparticipants;
    totalEe += society.eeparticipants;
    totalMe += society.meparticipants;
    totalCe += society.ceparticipants;
    totalMm += society.mmparticipants;
  }
  let totalNoArray = [totalCs, totalEc, totalEe, totalMe, totalCe, totalMm];
  let max = Math.max(...totalNoArray);
  let normalizedNo = totalNoArray.map((value) => {
    return Math.ceil((value / max) * 100);
  });
  console.log(normalizedNo);
  let branchValues = ["cs", "ec", "ee", "me", "ce", "mm"];
  let keyValueBranches = normalizedNo.reduce(function (result, field, index) {
    result[branchValues[index]] = field;
    return result;
  }, {});
  let branchDocs = await Branch.find();
  console.log(keyValueBranches);
  console.log(branchDocs);
  for (let index in keyValueBranches) {
    for (let eachBranch of branchDocs) {
      if (eachBranch.branch == index) {
        eachBranch.set({ part: keyValueBranches[index] });
        await eachBranch.save();
      }
    }
  }
}

function createSocietyWithScore(name, branch, score) {
  let obj;
  let council = getCouncil(name);
  switch (branch) {
    case "cs":
      obj = {
        council,
        name,
        csscore: score,
      };
      break;
    case "ec":
      obj = {
        council,
        name,
        ecscore: score,
      };
      break;
    case "ee":
      obj = {
        council,
        name,
        eescore: score,
      };
      break;
    case "me":
      obj = {
        council,
        name,
        mescore: score,
      };
      break;
    case "ce":
      obj = {
        council,
        name,
        cescore: score,
      };
      break;
    case "mm":
      obj = {
        council,
        name,
        mmscore: score,
      };
      break;
  }
  return obj;
}

function createSocietyWithParticipants(name, branch, noOfParticipants) {
  let obj;
  let council = getCouncil(name);
  switch (branch) {
    case "cs":
      obj = {
        council,
        name,
        csparticipants: noOfParticipants,
      };
      break;
    case "ec":
      obj = {
        council,
        name,
        ecparticipants: noOfParticipants,
      };
      break;
    case "ee":
      obj = {
        council,
        name,
        eeparticipants: noOfParticipants,
      };
      break;
    case "me":
      obj = {
        council,
        name,
        meparticipants: noOfParticipants,
      };
      break;
    case "ce":
      obj = {
        council,
        name,
        ceparticipants: noOfParticipants,
      };
      break;
    case "mm":
      obj = {
        council,
        name,
        mmparticipants: noOfParticipants,
      };
      break;
  }
  return obj;
}

function getCouncil(name) {
  let tech = ["webd", "neuromancers", "clix", "risc", "nakshatra"];
  let cult = [
    "kalakriti",
    "dramatics",
    "literary",
    "aaroh",
    "dgang",
    "cinematics",
    "s4s",
  ];
  let sports = ["game", "sport"];
  if (tech.includes(name)) {
    return "tech";
  } else if (cult.includes(name)) {
    return "cult";
  } else if (sports.includes(name)) {
    return "sports";
  }
}

async function createBranches() {
  let branchDocs = await Branch.find();
  let branchValues = ["cs", "ec", "ee", "me", "ce", "mm"];
  if (!branchDocs[0]) {
    let arrayOfObjs = [];
    for (let value of branchValues) {
      arrayOfObjs.push({ branch: value });
    }
    let result;
    for (let obj of arrayOfObjs) {
      result = await Branch.create(obj);
    }
    return result;
  }
}

module.exports = router;
