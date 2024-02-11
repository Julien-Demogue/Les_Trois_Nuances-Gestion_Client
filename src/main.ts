import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import MenuOptions from './components/MenuOptions.vue';
import AddClientForm from './components/AddClientForm.vue';

const app = createApp(App)

app.component('menu',MenuOptions);
app.component('add', AddClientForm);

app.mount('#app').$nextTick(() => {
  // Remove Preload scripts loading
  postMessage({ payload: 'removeLoading' }, '*')

  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
