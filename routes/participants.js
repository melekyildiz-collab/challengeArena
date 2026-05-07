const express = require("express");
const fs = require("fs");

const router = express.Router();

const participantsFile = "./data/participants.json";
const challengesFile = "./data/challenges.json";


// la route qui permet de créer un nouveau participant et de l'ajouter au fichier Json
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
    points: 0,
    completedChallenges: []
  };

  participants.push(newParticipant);

  fs.writeFileSync(
    participantsFile,
    JSON.stringify(participants, null, 2)
  );

  res.status(201).json(newParticipant);

});


// la route qui permet de valider un challenge pour un participant et de mettre à jour les points du participant dans le fichier Json
router.post("/:id/validate", (req, res) => {

  const participantId = parseInt(req.params.id);

  const { challengeId } = req.body;

  const participants = JSON.parse(
    fs.readFileSync(participantsFile)
  );

  const challenges = JSON.parse(
    fs.readFileSync(challengesFile)
  );//

  const participant = participants.find(
    p => p.id === participantId
  );
//Condition qui verifie si le participant existe ou pas sinon on retourne une erreur 404
  if (!participant) {
    return res.status(404).json({
      error: "Participant not found"
    });
  }

  const challenge = challenges.find(
    c => c.id === challengeId
  );
//Condition qui verifie si le challenge existe ou pas sinon on retourne une erreur 404
  if (!challenge) {
    return res.status(404).json({
      error: "Challenge not found"
    });
  }
//Condition qui verifie si le participant a déjà résolu le challenge, si ce n'est pas le cas on ajoute les points du challenge 
// au participant et on met à jour le fichier Json des participants
  if (
    participant.completedChallenges.includes(challengeId)
  ) {
    return res.status(400).json({
      error: "Challenge already completed"
    });
  }

  participant.points += challenge.points;

  participant.completedChallenges.push(challengeId);

  fs.writeFileSync(
    participantsFile,
    JSON.stringify(participants, null, 2)
  );//On met à jour le fichier Json des participants avec les nouveaux points du participant

  res.json({
    message: "Challenge validated",
    participant
  });

});

module.exports = router;