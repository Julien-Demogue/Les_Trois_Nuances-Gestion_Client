<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
import ClientLine from '../components/ClientLine.vue';
import { getClients,Client } from '../data/dao';
</script>

<template>
<div class="page">
    <TopBar />
    <div class="page-content">
      <SideBar />
      <div class="content">
        <div class="title"><p>Rechercher un client</p></div>
        <div class="search-form">
        <div class="input-group">
            <input type="text" class="input input-half" name="nom" placeholder="nom" required>
            <input type="text" class="input input-half" name="prenom" placeholder="prenom" required>
        </div>
        <div class="results-count">X résultats / Y clients</div>
            <div class="results-container">
              <div class="results-scroll-area">
                  <ClientLine :client=client v-for="(client) in clients" />
              </div>             
            </div>
        </div>
      </div>
      <SideBar />
    </div>
</div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      clients: [] as Client[]
    }
  },
  beforeMount() {
    getClients().then((clients) => {
      this.clients = clients;
    });
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

.results-count {
    color: #9D9797;
    font-size: 1rem;
    font-weight: bold;
}

.results-container{
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    background-color: #79C8F6;
    margin-top: 5vh;
    padding: 2%;
    border-radius: 12px;
    overflow-y: hiden;
    border: #5271FF solid 2px; 
    overflow-x: hidden;
}

.results-scroll-area{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  background-color: #79C8F6;
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #5271FF;
  border-radius: 2px;
}
</style>