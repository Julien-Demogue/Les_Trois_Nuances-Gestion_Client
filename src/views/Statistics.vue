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
      <SideBar side="left" />
      <div class="content">
        <div class="title"><p>Statistiques</p></div>
        <div class="stats-group">
          <StatSlot title="Nombre total de clients" :content=clients.length.toString() />
          <StatSlot title="Nombre de nouveaux clients dans les 12 derniers mois" :content=tools.getNewClientsAmount(clients).toString() />
          <StatSlot title="Age moyen des clients" :content="tools.getAverageAge(clients).toString() + ' ans'" />

          <StatSlot title="Provenance principale des clients" :content=tools.getCityProvenance(clients) />
          <StatSlot title="Pourcentage de clientes femmes" :content="tools.getFemaleAmount(clients).toString() + '%'" />
          <StatSlot title="Pourcentage de clients hommes" :content="tools.getMaleAmount(clients).toString() + '%'" />

          <StatSlot title="Pourcentage de clients venus dans les 12 derniers mois" :content="tools.getRecentlySeenClientsPercent(clients).toString() + '%'" />
          <StatSlot title="Pourcentage de femmes venues dans les 12 derniers mois" :content="tools.getRecentlySeenFemalePercent(clients).toString() + '%'" />
          <StatSlot title="Pourcentage d'hommes venus dans les 12 derniers mois" :content="tools.getRecentlySeenMalePercent(clients).toString() + '%'" />

          <StatSlot title="Nombre moyen de produits achetés par les clients" :content="tools.getAverageProducts(clients).toString()" />
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