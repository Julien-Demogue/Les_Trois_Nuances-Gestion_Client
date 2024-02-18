import {createRouter, createWebHashHistory} from 'vue-router';
import MainMenuVue from '../views/MainMenu.vue';
import AddClientVue from '../views/AddClient.vue';
import SearchClientVue from '../views/SearchClient.vue';
import ClientVue from '../views/Client.vue';

const routes = [
  {name:"menu", path: '/',component: MainMenuVue,},
  {name:"add", path: '/add-client',component: AddClientVue,},
  {name:"search", path:'/search-client',component: SearchClientVue,},
  {name:"client", path: '/search-client/client/:clientId',component: ClientVue,props:true}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;