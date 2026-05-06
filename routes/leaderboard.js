const express = require("express");
const { readFile, writeFile } = require("fs/promises");


const app = express();
app.use(express.json());
const participantsFile = "./data/participants.json";

app.get("/", async (req, res) => {
  const participants = await readFile(participantsFile, "utf-8");
  const participantsJson = JSON.parse(participants);
  const sortedParticipants = participantsJson.sort((a, b) => b.score - a.score);
  res.status(200).json(sortedParticipants);
});

module.exports = app;