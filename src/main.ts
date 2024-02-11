import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import MainMenu from './vues/MainMenu.vue';
import AddClientForm from './vues/AddClient.vue';
import SearchClient from './vues/SearchClient.vue';

const app = createApp(App)

app.component('menu',MainMenu);
app.component('add', AddClientForm);
app.component('search', SearchClient);

app.mount('#app').$nextTick(() => {
  // Remove Preload scripts loading
  postMessage({ payload: 'removeLoading' }, '*')

  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
