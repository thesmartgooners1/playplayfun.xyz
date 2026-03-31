const fetch = require("node-fetch");

fetch("https://ultimate-football-data-api.p.rapidapi.com/ufd/21/players", {
  headers: {
    "x-rapidapi-key": "YOUR_API_KEY",
    "x-rapidapi-host": "ultimate-football-data-api.p.rapidapi.com"
  }
})
.then(res => res.json())
.then(data => console.log(data))
  {
    home: "Manchester United",
    away: "Liverpool",
    homeLogo: "https://via.placeholder.com/30?text=MU",
    awayLogo: "https://via.placeholder.com/30?text=LIV",
    score: "2 - 1",
    status: "LIVE"
  },
  {
    home: "Barcelona",
    away: "Real Madrid",
    homeLogo: "https://via.placeholder.com/30?text=BAR",
    awayLogo: "https://via.placeholder.com/30?text=RMA",
    score: "0 - 0",
    status: "45'"
  },
  {
    home: "Bayern",
    away: "Dortmund",
    homeLogo: "https://via.placeholder.com/30?text=BAY",
    awayLogo: "https://via.placeholder.com/30?text=DOR",
    score: "vs",
    status: "20:00"
  }
];

const container = document.getElementById("matches");

matches.forEach(match => {
  const card = document.createElement("div");
  card.className = "match-card";

  card.innerHTML = `
    <div class="teams">
      <div class="team">
        <img src="${match.homeLogo}">
        ${match.home}
      </div>

      <div class="score">${match.score}</div>

      <div class="team">
        <img src="${match.awayLogo}">
        ${match.away}
      </div>
    </div>

    <div class="status">${match.status}</div>
  `;

  container.appendChild(card);
});
