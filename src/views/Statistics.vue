<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
import StatSlot from '../components/StatSlot.vue';
import { getClients } from '../dao';
import * as tools from '../tools'
</script>

<template>
<div class="page">
    <TopBar/>
    <div class="page-content">
      <SideBar />
      <div class="content">
        <div class="title"><p>Statistiques</p></div>
        <div class="stats-group">
          <StatSlot title="Nombre total de clients" :content=clients.length.toString() />
          <StatSlot title="Nombre de nouveaux clients (moins d'un an)" :content=tools.getNewClientsAmount(clients).toString() />
          <StatSlot title="Age moyen des clients" :content=tools.getAverageAge(clients).toString() />

          <StatSlot title="Provenance principale des clients" :content=tools.getDepartmentalProvenance(clients) />
          <StatSlot title="Pourcentage de femmes" :content="tools.getFemaleAmount(clients).toString() + '%'" />
          <StatSlot title="Pourcentage d'hommes" :content="tools.getMaleAmount(clients).toString() + '%'" />

          <StatSlot title="Pourcentage de clients venus dans l'année" :content="tools.getRecentlySeenClientsPercent(clients).toString() + '%'" />
          <StatSlot title="Pourcentage de femmes venues dans l'année" :content="tools.getRecentlySeenFemalePercent(clients).toString() + '%'" />
          <StatSlot title="Pourcentage d'hommes venus dans l'année" :content="tools.getRecentlySeenMalePercent(clients).toString() + '%'" />
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
      clients: [] as tools.Client[],
    }
  },
  mounted() {
    getClients().then((clients) => {
      this.clients = clients;
    })
  },
}
</script>

<style scoped>
.stats-group{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
}
</style>