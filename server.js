// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

// Replace with your own API-Football key
const API_KEY = "YOUR_API_KEY";

app.get("/api/live", async (req, res) => {
  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      { headers: { "x-apisports-key": API_KEY } }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`);
});
