const matchesContainer = document.getElementById("matches");
const statusText = document.getElementById("status");

// 🔥 Try multiple endpoints (since API is unknown)
const endpoints = [
  "https://api.cameltv.live",
  "https://api.cameltv.live/matches",
  "https://api.cameltv.live/live"
];

async function fetchMatches() {
  for (let url of endpoints) {
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log("API RESPONSE:", data);

      const matches = extractMatches(data);

      if (matches.length) {
        statusText.textContent = "🟢 Live Matches";
        render(matches);
        return;
      }

    } catch (err) {
      console.warn("Failed:", url);
    }
  }

  statusText.textContent = "❌ API not working";
}

// 🧠 Smart extractor (handles unknown formats)
function extractMatches(data) {
  if (!data) return [];

  if (Array.isArray(data)) return data;

  if (data.matches) return data.matches;
  if (data.data) return data.data;
  if (data.response) return data.response;

  return [];
}

function render(matches) {
  matchesContainer.innerHTML = "";

  matches.forEach(match => {
    const home =
      match.home ||
      match.homeTeam ||
      match.team1 ||
      "Home";

    const away =
      match.away ||
      match.awayTeam ||
      match.team2 ||
      "Away";

    const score =
      match.score ||
      `${match.homeScore || 0} - ${match.awayScore || 0}`;

    const time =
      match.time ||
      match.minute ||
      match.status ||
      "Live";

    const div = document.createElement("div");
    div.className = "match";

    div.innerHTML = `
      <div class="teams">
        <span>${home}</span>
        <span>${away}</span>
      </div>

      <div class="score">${score}</div>

      <div class="time live">🔴 ${time}</div>
    `;

    matchesContainer.appendChild(div);
  });
}

// 🔄 Auto refresh every 30s
setInterval(fetchMatches, 30000);

// 🚀 Start
fetchMatches();
