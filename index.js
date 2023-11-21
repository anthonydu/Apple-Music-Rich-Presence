let client = null;
require("dotenv").config();

const iTunes = require("./bridge/iTunesBridge.js");
const iTunesApp = new iTunes();

let state = "Not Opened";
let currentSong = {};
let startDate = new Date();
let lastSong = "";

const { app, Tray, Menu } = require("electron");
const { menubar } = require("menubar");

app.on("ready", () => {
  const tray = new Tray(app.getAppPath() + "/icons/trayTemplate@2x.png");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Launch at startup",
      type: "checkbox",
      checked: app.getLoginItemSettings().openAtLogin,
      click: (event) => {
        app.setLoginItemSettings({
          openAtLogin: event.checked,
        });
      },
    },
    {
      label: "Quit AppleMusicRPC",
      role: "quit",
      accelerator: "Command+Q",
    },
  ]);
  tray.setContextMenu(contextMenu);
  const mb = menubar({ tray });
  mb.on("ready", () => {
    console.log("AppleMusicRPC is ready.");
    tray.removeAllListeners();
  });
});

async function update() {
  currentSong = await iTunesApp.getCurrentSong();

  if (currentSong) state = await iTunesApp.getState();

  if (state == "Not Opened" || state == "Stopped" || state == "Paused") {
    if (client) {
      client.disconnect();
      client = null;
    }
    return;
  } else {
    if (!client)
      client = require("discord-rich-presence")("861702238472241162");
  }

  if (currentSong.name && currentSong.name.includes(" - ")) {
    const split = currentSong.name.split(/\s*\-\s*/);
    const artist = split.length > 1 ? split[0] : null;
    const songname = split.length > 1 ? split[1] : currentSong.name;
    currentSong.artist = artist;
    currentSong.name = songname;
  }

  let fullTitle = currentSong
    ? `${currentSong.artist || "Unknown Artist"} - ${currentSong.name}`
    : "No Song";

  if (state == "Playing" && (fullTitle !== lastSong || !lastSong)) {
    startDate = new Date();
    lastSong = `${currentSong.artist || "Unknown Artist"} - ${
      currentSong.name
    }`;
    startDate.setSeconds(
      new Date().getSeconds() - parseInt(currentSong.elapsed) - 1
    );
  }

  startDate = new Date();
  startDate.setSeconds(new Date().getSeconds() - parseInt(currentSong.elapsed));

  client.updatePresence({
    state: state == "Playing" ? `on ${currentSong.album || "Unknown"}` : state,
    details: `${currentSong.artist || "Unknown"} - ${
      currentSong.name || "Unknown"
    }`,
    startTimestamp: state == "Playing" ? startDate.getTime() : Date.now(),
    largeImageKey: "applemusic",
    smallImageKey: state == "Playing" ? "play" : "pause",
    smallImageText: state,
    largeImageText: state == "Playing" ? `${fullTitle}` : "Idling",
    buttons: [
      {
        label: "Search on Apple Music",
        url: `https://music.apple.com/us/search?term=${encodeURIComponent(
          currentSong.artist ? fullTitle : currentSong.name
        )}`,
      },
      {
        label: "Search on Spotify",
        url: `https://open.spotify.com/search/${encodeURIComponent(
          currentSong.artist ? fullTitle : currentSong.name
        )}`,
      },
    ],
    instance: true,
  });
}

// update interval extended because a short interval
// causes relaunch of the Music app shortly after closing
setInterval(update, 5000);
