const video = document.getElementById("video");
const channelName = document.getElementById("channel-name");
const channelList = document.getElementById("channel-list");
const epgList = document.getElementById("epg-list");

let currentChannel = 0;
let hls;

// 📡 Channel Data (Use real IPTV sources if available)
const channels = [
  {
    name: "News Channel",
    logo: "https://via.placeholder.com/80?text=News",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    epg: ["08:00 News", "09:00 Headlines", "10:00 Live Report"]
  },
  {
    name: "Sports TV",
    logo: "https://via.placeholder.com/80?text=Sports",
    url: "https://test-streams.mux.dev/test_001/stream.m3u8",
    epg: ["08:00 Football", "10:00 Tennis", "12:00 Cricket"]
  }
];

// 🎬 Load Channel
function loadChannel(index) {
  currentChannel = index;
  const channel = channels[index];

  channelName.innerText = channel.name;

  if (hls) hls.destroy();

  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(channel.url);
    hls.attachMedia(video);
  } else {
    video.src = channel.url;
  }

  video.play();
  loadEPG(channel.epg);
}

// 📅 Load EPG
function loadEPG(epg) {
  epgList.innerHTML = "";
  epg.forEach(show => {
    const li = document.createElement("li");
    li.textContent = show;
    epgList.appendChild(li);
  });
}

// 📺 Render Channel List
channels.forEach((ch, i) => {
  const div = document.createElement("div");
  div.className = "channel";
  div.innerHTML = `<img src="${ch.logo}"><p>${ch.name}</p>`;
  div.onclick = () => loadChannel(i);
  channelList.appendChild(div);
});

// ⏭ Channel Controls
function nextChannel() {
  loadChannel((currentChannel + 1) % channels.length);
}

function prevChannel() {
  loadChannel((currentChannel - 1 + channels.length) % channels.length);
}

// 🔊 Volume (keyboard)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") video.volume = Math.min(1, video.volume + 0.1);
  if (e.key === "ArrowDown") video.volume = Math.max(0, video.volume - 0.1);
  if (e.key === "ArrowRight") nextChannel();
  if (e.key === "ArrowLeft") prevChannel();
  if (e.key === "f") toggleFullscreen();
});

// ⛶ Fullscreen
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// ▶ Start
loadChannel(0);
