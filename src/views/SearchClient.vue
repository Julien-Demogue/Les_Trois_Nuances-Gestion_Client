<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
import ClientLine from '../components/ClientLine.vue';
import { getClients } from '../dao';
import {Client} from '../tools'
</script>

<template>
<div class="page">
    <TopBar previousPage="/" />
    <div class="page-content">
      <SideBar side="left" />
      <div class="content">
        <div class="title"><p>Rechercher un client</p></div>
        <div class="search-form">
        <div class="input-group search-input">
          <input type="text" class="input input-half" name="prenom" placeholder="Prénom" v-model="firstName" @input="filterClients">
          <input type="text" class="input input-half" name="nom" placeholder="Nom" v-model="lastName" @input="filterClients">  
        </div>
        <div class="results-count">{{ filteredClients.length }} résultat(s) / {{ clients.length }} clients</div>
            <div class="results-container">
              <div class="results-scroll-area">
                  <ClientLine v-for="(client,i) in filteredClients" :client=client :index=i+1 />
              </div>             
            </div>
        </div>
      </div>
      <SideBar side="right" />
    </div>
</div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      clients: [] as Client[],
      firstName: "",
      lastName: ""
    }
  },
  mounted() {
    getClients().then((clients) => {
      this.clients = clients;
    });
  },
  methods: {
    // Actualiser le filtre de clients
    filterClients() {
      this.filteredClients = this.clients.filter((client) => {
        const nomMatch = this.lastName ? client.lastName?.toLowerCase().includes(this.lastName.toLowerCase()) : true;
        const prenomMatch = this.firstName ? client.firstName?.toLowerCase().includes(this.firstName.toLowerCase()) : true;
        return nomMatch && prenomMatch;
      });
    },
  },
  computed:{
    // Renvoie la liste des clients filtres
    filteredClients() {
      return this.clients.filter((client) => {
        const nomMatch = this.lastName ? client.lastName?.toLowerCase().includes(this.lastName.toLowerCase()) : true;
        const prenomMatch = this.firstName ? client.firstName?.toLowerCase().includes(this.firstName.toLowerCase()) : true;
        return nomMatch && prenomMatch;
      });
    },
  }
}
</script>

<style scoped>
.search-form {
    width: 100%;
    height: 65vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-input{
  width: 40%;
}

.results-count {
    color: #746c6c;
    font-size: 1.15rem;
    font-weight: bold;
}

.results-container{
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    background-color: #f5a9ff;
    margin-top: 5vh;
    padding: 2%;
    border-radius: 12px;
    overflow-y: hiden;
    border: #ff87f9 solid 2px; 
    overflow-x: hidden;
}

.results-scroll-area{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  background-color: #f5a9ff;
  overflow-y: auto;
}
</style>../tools../../public/data/dao../dao