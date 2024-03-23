import { app, BrowserWindow,dialog,ipcMain} from 'electron';
import path from 'node:path';
import fs from 'fs';
import fsP from 'fs/promises';


// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: 'icon.ico',
    width:1920,
    height:1080,
    fullscreen:true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

app.whenReady().then(async () => {
  await initClientsFile();
  createWindow();
})

// Initialiser le fichier de donnees client si il n'existe pas encore
async function initClientsFile(){
  const clientsFilePath = 'clients.json';
  try {
    await fsP.access(clientsFilePath, fsP.constants.F_OK);
  } catch (err:any) {
    if (err.code === 'ENOENT') {
      await fsP.writeFile(clientsFilePath, '[]');
      console.log(`Created clients.json file at ${clientsFilePath}`);
    } else {
      console.error(`Error checking for clients.json file: ${err}`);
    }
  }
}

// Methode ouvrant un menu permettant d'enregistrer les donnees client 
const exportData = () => {
  const date = new Date().toLocaleDateString('fr-FR').split("/").join("-");
  const options = {
    title: 'Sauvegarder les données client',
    defaultPath: app.getPath('downloads') + ("/fichier_client (" + date +")"),
    filters: [
      { name: 'Fichiers json', extensions: ['json'] },
      { name: 'Tous les fichiers', extensions: ['*'] },
    ],
  };

  if(win){
    dialog.showSaveDialog(win , options).then(async (result) => {
      if (result.filePath) {
        try {
          const data = await fs.promises.readFile('clients.json', 'utf-8');
          await fs.writeFile(result.filePath, data, err => {
            console.error(err);
          });
          console.log(`Fichier enregistre : ${result.filePath}`);
        } catch (error:any) {
          console.error(`Erreur lors de l'enregistrement du fichier : ${error.message}`);
        }
      } else {
        console.log('Enregistrement annule');
      }
    });
  }
};

// Methode ouvrant un menu permettant d'importer un fichier de donnees client 
const importData = () => {
  const options = {
    title: 'Importer les données client',
    defaultPath: app.getPath('downloads'),
    filters: [
      { name: 'Fichiers json', extensions: ['json'] },
      { name: 'Tous les fichiers', extensions: ['*'] },
    ],
  };

  if (win) {
    dialog.showOpenDialog(win, options).then(async (result) => {
      if (result.filePaths.length > 0) {
        const filePath = result.filePaths[0];
        const data = await fs.promises.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(data);

        await fs.promises.writeFile('clients.json', JSON.stringify(jsonData, null, 2));

        console.log(`Fichier importe : ${filePath}`);

      } else {
        console.log('Importation annulee');
      }
    });
  }
};

ipcMain.on('export-data', (_event, _arg) => {
  exportData();
})

ipcMain.on('import-data', (_event, _arg) => {
  importData();
});
