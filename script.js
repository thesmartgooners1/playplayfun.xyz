const matchesContainer = document.getElementById("matches");
const statusText = document.getElementById("status");

const modal = document.getElementById("modal");
const details = document.getElementById("details");
const closeBtn = document.getElementById("close");

// 🔥 FREE API
const API = "https://www.scorebat.com/video-api/v3/";

async function getMatches() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    console.log(data);

    const matches = data.response || [];

    statusText.textContent = `🟢 ${matches.length} Matches`;
    render(matches);

  } catch (err) {
    statusText.textContent = "❌ Failed to load";
    console.error(err);
  }
}

function render(matches) {
  matchesContainer.innerHTML = "";

  matches.forEach(match => {
    const div = document.createElement("div");
    div.className = "match";

    const title = match.title || "Match";
    const league = match.competition || "League";
    const date = new Date(match.date).toLocaleString();

    div.innerHTML = `
      <div class="league">${league}</div>
      <div class="title">${title}</div>
      <div class="score">Click to watch highlights</div>
      <div class="live">🔴 Latest</div>
    `;

    div.onclick = () => showDetails(match);

    matchesContainer.appendChild(div);
  });
}

function showDetails(match) {
  modal.classList.remove("hidden");

  details.innerHTML = `
    <h2>${match.title}</h2>
    <p>${match.competition}</p>
    <p>${new Date(match.date).toLocaleString()}</p>

    <div>${match.embed}</div>
  `;
}

closeBtn.onclick = () => modal.classList.add("hidden");

window.onclick = (e) => {
  if (e.target === modal) modal.classList.add("hidden");
};

// 🔄 Auto refresh
setInterval(getMatches, 60000);

// 🚀 Start
getMatches();
