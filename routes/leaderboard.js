const express = require("express");
const { readFile } = require("fs/promises");

const app = express();
app.use(express.json());
const participantsFile = "./data/participants.json";//Le chemin pour accéder au fichier Json de participants

//C'est une route qui permet de lire les participants par ordre décroissant de points du plus grand au plus petit 
app.get("/", async (req, res) => {
  const participants = await readFile(participantsFile, "utf-8");
  const participantsJson = JSON.parse(participants);
  const sortedParticipants = participantsJson.sort((a, b) => b.points - a.points);
  return res.status(200).json(sortedParticipants);
});

module.exports = app;