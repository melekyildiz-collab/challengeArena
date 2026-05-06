const express = require("express");

const participantsRoutes = require("./routes/participants");

const app = express();

app.use(express.json());

app.use("/participants", participantsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Challenge Arena API"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});