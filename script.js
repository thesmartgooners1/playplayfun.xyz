const matchesContainer = document.getElementById("matches");
const statusText = document.getElementById("status");

const modal = document.getElementById("modal");
const details = document.getElementById("details");
const closeBtn = document.getElementById("close");

async function fetchLiveMatches() {
  statusText.textContent = "Loading matches...";
  try {
    const res = await fetch("http://localhost:3000/api/live");
    const data = await res.json();
    const matches = data.response;

    if (!matches.length) {
      statusText.textContent = "No live matches right now";
      return;
    }

    statusText.textContent = `🟢 ${matches.length} Live Matches`;
    renderMatches(matches);

  } catch (err) {
    console.error(err);
    statusText.textContent = "❌ Failed to load matches";
  }
}

function renderMatches(matches) {
  matchesContainer.innerHTML = "";
  matches.forEach(match => {
    const div = document.createElement("div");
    div.className = "match";

    const homeLogo = match.teams.home.logo || "";
    const awayLogo = match.teams.away.logo || "";
    const homeName = match.teams.home.name;
    const awayName = match.teams.away.name;
    const score = `${match.goals.home ?? 0} - ${match.goals.away ?? 0}`;

    div.innerHTML = `
      <div class="teams">
        <img src="${homeLogo}" class="team-logo" /> ${homeName}
        <span>vs</span>
        <img src="${awayLogo}" class="team-logo" /> ${awayName}
      </div>
      <div class="score">${score}</div>
      <div class="live-pulse"></div>
    `;

    div.onclick = () => showDetails(match);
    matchesContainer.appendChild(div);
  });
}

function showDetails(match) {
  modal.classList.remove("hidden");
  details.innerHTML = `
    <h2>${match.teams.home.name} vs ${match.teams.away.name}</h2>
    <p>League: ${match.league.name}</p>
    <p>Status: ${match.fixture.status.long}</p>
    <p>Score: ${match.goals.home} - ${match.goals.away}</p>
    <p>Venue: ${match.fixture.venue.name}, ${match.fixture.venue.city}</p>
  `;
}

closeBtn.onclick = () => modal.classList.add("hidden");
window.onclick = e => { if(e.target===modal) modal.classList.add("hidden") }

// Auto refresh every 30s
setInterval(fetchLiveMatches, 30000);
fetchLiveMatches();
