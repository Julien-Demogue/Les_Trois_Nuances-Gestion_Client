import {createRouter, createWebHashHistory} from 'vue-router';
import MainMenu from '../views/MainMenu.vue';
import AddClient from '../views/AddClient.vue';
import SearchClient from '../views/SearchClient.vue';
import Client from '../views/Client.vue';

const routes = [
  {path: '/',component: MainMenu,},
  {path: '/add-client',component: AddClient,},
  {path:'/search-client',component: SearchClient,},
  {path: '/search-client/client',component: Client,},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;