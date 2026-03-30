const leaguesContainer = document.getElementById("leagues");
const statusText = document.getElementById("status");
const modal = document.getElementById("modal");
const matchDetails = document.getElementById("matchDetails");
const closeBtn = document.getElementById("close");

let socket;

function connect() {
  socket = new WebSocket("wss://ws.kora-api.space/");

  socket.onopen = () => {
    statusText.textContent = "🟢 Live";
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const matches = data.matches || data.data || data || [];
    render(matches);
  };

  socket.onclose = () => {
    statusText.textContent = "Reconnecting...";
    setTimeout(connect, 3000);
  };
}

function render(matches) {
  leaguesContainer.innerHTML = "";

  // GROUP BY LEAGUE
  const leagues = {};

  matches.forEach(m => {
    const league = m.league || "Other";
    if (!leagues[league]) leagues[league] = [];
    leagues[league].push(m);
  });

  for (let league in leagues) {
    const leagueDiv = document.createElement("div");
    leagueDiv.className = "league";

    leagueDiv.innerHTML = `<div class="league-title">${league}</div>`;

    leagues[league].forEach(match => {
      const div = document.createElement("div");
      div.className = "match";

      const home = match.home || match.homeTeam;
      const away = match.away || match.awayTeam;

      const homeLogo = match.homeLogo || "https://via.placeholder.com/24";
      const awayLogo = match.awayLogo || "https://via.placeholder.com/24";

      const score = match.score || `${match.homeScore || 0} - ${match.awayScore || 0}`;

      div.innerHTML = `
        <div class="teams">
          <div class="team">
            <img src="${homeLogo}">
            ${home}
          </div>
          <div class="team">
            ${away}
            <img src="${awayLogo}">
          </div>
        </div>

        <div class="score">${score}</div>

        <div class="live">
          <span class="pulse"></span> LIVE
        </div>
      `;

      // CLICK → DETAILS
      div.onclick = () => showDetails(match);

      leagueDiv.appendChild(div);
    });

    leaguesContainer.appendChild(leagueDiv);
  }
}

function showDetails(match) {
  modal.classList.remove("hidden");

  matchDetails.innerHTML = `
    <h2>${match.home} vs ${match.away}</h2>
    <p>Score: ${match.score}</p>
    <p>Time: ${match.time || "Live"}</p>
    <hr>
    <p>Shots: ${match.shots || "-"}</p>
    <p>Possession: ${match.possession || "-"}</p>
    <p>Cards: ${match.cards || "-"}</p>
  `;
}

closeBtn.onclick = () => modal.classList.add("hidden");

window.onclick = (e) => {
  if (e.target === modal) modal.classList.add("hidden");
};

connect();
