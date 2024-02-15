"use strict";
const electron = require("electron");
const path = require("node:path");
const { MongoClient } = require("mongodb");
const mongoURL = "mongodb://localhost:27017/Gestion_client";
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
let win;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function createWindow() {
  const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect((err, db) => {
    if (err) {
      console.error("Error connecting to MongoDB:", err);
      return;
    }
    db.close();
  });
  win = new electron.BrowserWindow({
    width: 1920,
    height: 1080,
    backgroundColor: "#D5F0FF",
    fullscreen: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
    win = null;
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
electron.app.whenReady().then(createWindow);
