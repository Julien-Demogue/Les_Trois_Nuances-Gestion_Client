<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
import StatSlot from '../components/StatSlot.vue';
</script>

<template>
<div class="page">
    <TopBar/>
    <div class="page-content">
      <SideBar />
      <div class="content">
        <div class="title"><p>Statistiques</p></div>
        <div class="stats-group">
          <StatSlot title="Nombre de clients total" content="52" />
          <StatSlot title="Age moyen des clients" content="34 ans" />
          <StatSlot title="Nombre de clients vus dans l'année" content="45" />
          <StatSlot title="Taux de femmes" content="40%" />
          <StatSlot title="Taux d'hommes" content="60%" />
          <StatSlot title="Provenance principale des clients" content="56890" />
          <StatSlot title="Nombre de nouveaux clients dans l'année" content="3" />
        </div>
      </div>
      <SideBar />
    </div>
</div>
</template>

<style scoped>
.stats-group{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
}
</style>