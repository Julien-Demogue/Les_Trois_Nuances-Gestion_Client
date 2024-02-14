import {createRouter, createWebHashHistory} from 'vue-router';
import MainMenu from '../views/MainMenu.vue';
import AddClient from '../views/AddClient.vue';
import SearchClient from '../views/SearchClient.vue';
import Client from '../views/Client.vue';

const routes = [
  {name:"menu", path: '/',component: MainMenu,},
  {name:"add", path: '/add-client',component: AddClient,},
  {name:"search", path:'/search-client',component: SearchClient,},
  {name:"client", path: '/search-client/client',component: Client,}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;