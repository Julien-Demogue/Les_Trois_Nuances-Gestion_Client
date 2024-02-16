import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { ipcMain } from 'electron';
import { Collection } from 'mongodb';

const app = createApp(App)

app.use(router);

app.mount('#app').$nextTick(() => {
  // Remove Preload scripts loading
  postMessage({ payload: 'removeLoading' }, '*')

  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('/path/to/database/file.db');
// create a table and insert a row
db.serialize(() => {
  db.run("CREATE TABLE Users (name, lastName)");
  db.run("INSERT INTO Users VALUES (?, ?)", ['foo', 'bar']);
});

ipcMain.handle('db-query', async (event, sqlQuery) => {
  return new Promise(res => {
      db.all(sqlQuery, (err:Error, rows:Collection) => {
        res(rows);
      });
  });
});