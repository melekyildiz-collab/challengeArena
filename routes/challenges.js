const express = require("express");
const { readFile, writeFile } = require("fs/promises");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const challengePath = "./data/challenges.json";

app.get("/", async (req, res) => {
  const challenges = await readFile(challengePath, "utf-8");
  const challengesJson = JSON.parse(challenges);
  res.status(200).json(challengesJson);
});

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

  challengesJson.push(challenge);

  await writeFile(challengePath,JSON.stringify(challengesJson, null, 2)
  );

  res.status(201).json(challenge);
});

module.exports = app;