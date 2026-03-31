const video = document.getElementById("video");
const matchTitle = document.getElementById("match-title");
const matchList = document.getElementById("match-list");

let hls;

// ⚽ Match Data (demo streams)
const matches = [
  {
    title: "Manchester United vs Liverpool",
    teams: ["MU", "LIV"],
    logos: [
      "https://via.placeholder.com/40?text=MU",
      "https://via.placeholder.com/40?text=LIV"
    ],
    stream: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    time: "Live Now"
  },
  {
    title: "Barcelona vs Real Madrid",
    teams: ["BAR", "RMA"],
    logos: [
      "https://via.placeholder.com/40?text=BAR",
      "https://via.placeholder.com/40?text=RMA"
    ],
    stream: "https://test-streams.mux.dev/test_001/stream.m3u8",
    time: "Live Now"
  }
];

// ▶ Load Stream
function playMatch(index) {
  const match = matches[index];
  matchTitle.innerText = match.title;

  if (hls) hls.destroy();

  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(match.stream);
    hls.attachMedia(video);
  } else {
    video.src = match.stream;
  }

  video.play();
}

// 🎮 Render Matches
matches.forEach((match, i) => {
  const div = document.createElement("div");
  div.className = "match";

  div.innerHTML = `
    <img src="${match.logos[0]}"> 
    vs 
    <img src="${match.logos[1]}">
    <p>${match.title}</p>
    <small>${match.time}</small>
  `;

  div.onclick = () => playMatch(i);
  matchList.appendChild(div);
});

// 🎛 Keyboard Controls
document.addEventListener("keydown", (e) => {
  if (e.key === "f") video.requestFullscreen();
  if (e.key === "ArrowUp") video.volume += 0.1;
  if (e.key === "ArrowDown") video.volume -= 0.1;
});

// ▶ Start first match
playMatch(0);
