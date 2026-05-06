const express = require("express");
const fs = require("fs");

const router = express.Router();

const participantsFile = "./data/participants.json";
const challengesFile = "./data/challenges.json";


// CREATE PARTICIPANT
router.post("/", (req, res) => {

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Name is required"
    });
  }

  const participants = JSON.parse(
    fs.readFileSync(participantsFile)
  );

  const newParticipant = {
    id: participants.length + 1,
    name,
    points: 0
  };

  participants.push(newParticipant);

  fs.writeFileSync(
    participantsFile,
    JSON.stringify(participants, null, 2)
  );

  res.status(201).json(newParticipant);

});


// VALIDATE CHALLENGE
router.post("/:id/validate", (req, res) => {

  const participantId = parseInt(req.params.id);

  const { challengeId } = req.body;

  const participants = JSON.parse(
    fs.readFileSync(participantsFile)
  );

  const challenges = JSON.parse(
    fs.readFileSync(challengesFile)
  );

  const participant = participants.find(
    p => p.id === participantId
  );

  if (!participant) {
    return res.status(404).json({
      error: "Participant not found"
    });
  }

  const challenge = challenges.find(
    c => c.id === challengeId
  );

  if (!challenge) {
    return res.status(404).json({
      error: "Challenge not found"
    });
  }

  participant.points += challenge.points;

  fs.writeFileSync(
    participantsFile,
    JSON.stringify(participants, null, 2)
  );

  res.json({
    message: "Challenge validated",
    participant
  });

});

module.exports = router;