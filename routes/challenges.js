const app = express();
const challengePath = new URL("../data/challenges.json", import.meta.url);

app.get("/challenges", async (req, res) => {
  const challenges = await readFile(challengePath, "utf-8");
  const challengesJson = JSON.parse(challenges);
  res.status(200).json({ challengesJson });
});

app.post("/challenges", async (req, res) => {
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
    await writeFile(challengePath, JSON.stringify(challengesJson, null, 2));
    res.status(201).json({ challenge });
    
});

export default app;
