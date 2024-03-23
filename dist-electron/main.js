"use strict";
const electron = require("electron");
const path = require("node:path");
const fs = require("fs");
const fsP = require("fs/promises");
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
let win;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function createWindow() {
  win = new electron.BrowserWindow({
    icon: "icon.ico",
    width: 1920,
    height: 1080,
    fullscreen: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
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
electron.app.whenReady().then(async () => {
  await initClientsFile();
  createWindow();
});
async function initClientsFile() {
  const clientsFilePath = "clients.json";
  try {
    await fsP.access(clientsFilePath, fsP.constants.F_OK);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fsP.writeFile(clientsFilePath, "[]");
      console.log(`Created clients.json file at ${clientsFilePath}`);
    } else {
      console.error(`Error checking for clients.json file: ${err}`);
    }
  }
}
const exportData = () => {
  const date = (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR").split("/").join("-");
  const options = {
    title: "Sauvegarder les données client",
    defaultPath: electron.app.getPath("downloads") + ("/fichier_client (" + date + ")"),
    filters: [
      { name: "Fichiers json", extensions: ["json"] },
      { name: "Tous les fichiers", extensions: ["*"] }
    ]
  };
  if (win) {
    electron.dialog.showSaveDialog(win, options).then(async (result) => {
      if (result.filePath) {
        try {
          const data = await fs.promises.readFile("clients.json", "utf-8");
          await fs.writeFile(result.filePath, data, (err) => {
            console.error(err);
          });
          console.log(`Fichier enregistre : ${result.filePath}`);
        } catch (error) {
          console.error(`Erreur lors de l'enregistrement du fichier : ${error.message}`);
        }
      } else {
        console.log("Enregistrement annule");
      }
    });
  }
};
const importData = () => {
  const options = {
    title: "Importer les données client",
    defaultPath: electron.app.getPath("downloads"),
    filters: [
      { name: "Fichiers json", extensions: ["json"] },
      { name: "Tous les fichiers", extensions: ["*"] }
    ]
  };
  if (win) {
    electron.dialog.showOpenDialog(win, options).then(async (result) => {
      if (result.filePaths.length > 0) {
        const filePath = result.filePaths[0];
        const data = await fs.promises.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(data);
        await fs.promises.writeFile("clients.json", JSON.stringify(jsonData, null, 2));
        console.log(`Fichier importe : ${filePath}`);
      } else {
        console.log("Importation annulee");
      }
    });
  }
};
electron.ipcMain.on("export-data", (_event, _arg) => {
  exportData();
});
electron.ipcMain.on("import-data", (_event, _arg) => {
  importData();
});
