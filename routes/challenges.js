const express = require("express");
const { readFile, writeFile } = require("fs/promises");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const challengePath = "./data/challenges.json";//Le chemin pour accéder au fichier Json de challenges

//La route qui permet de lire tous les challenges du fichier Json
app.get("/", async (req, res) => {
  const challenges = await readFile(challengePath, "utf-8");
  const challengesJson = JSON.parse(challenges);
  res.status(200).json(challengesJson);
});


//la route qui permet de créer un nouveau challenge et de l'ajouter au fichier Json
app.post("/", async (req, res) => {
  const { title, description, level } = req.body;

  const challenge = {
    id: crypto.randomUUID(),
    title,
    description,
    level
  };

  const challenges = await readFile(challengePath, "utf-8");
  const challengesJson = JSON.parse(challenges);
//On ajoute le nouveau challenge à la liste des challenges existants 
  challengesJson.push(challenge);

  await writeFile(challengePath,JSON.stringify(challengesJson, null, 2)// Pemet d'écrire le nouveau challenge dans le fichier Json 
  );

  return res.status(201).json(challenge);
});

module.exports = app; 