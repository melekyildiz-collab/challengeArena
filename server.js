const express = require("express");

const participantsRoutes = require("./routes/participants");
const challengesRoutes = require("./routes/challenges");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

app.use(express.json());

app.use("/participants", participantsRoutes); 
app.use("/challenges", challengesRoutes);
app.use("/leaderboard", leaderboardRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Challenge Arena API"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});