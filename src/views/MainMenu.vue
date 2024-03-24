<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
const { ipcRenderer  } = require ("electron");
</script>

<template>
<div class="page">
    <TopBar :showReturnBtn="false"/>
    <div class="page-content">
      <SideBar />
      <div class="content">
        <div class="title"><p>Menu</p></div>
        <div class="find-btn"><router-link to="/search-client"><button class="btn">Rechercher un client</button></router-link></div>
        <div class="separator"><hr></div>
        <div class="add-btn"><router-link to="/add-client"><button class="btn">Ajouter un client</button></router-link></div>
        <div class="separator"><hr></div>
        <div class="stats-btn"><router-link to="/stats"><button class="btn">Statistiques</button></router-link></div>

        <div class="data-manager-group">
          <div class="export-data-btn"><button class="btn" @click="ipcRenderer.send('export-data')">Exporter les données</button></div>
          <div class="import-data-btn"><button class="btn" @click="ipcRenderer.send('import-data')">Importer des données</button></div>
        </div>
        
      </div>
      <SideBar />
    </div>
</div>
</template>

<style scoped>
.find-btn button, .add-btn button, .stats-btn button{
    height: 70px;
    width: 400px;
    background-color: #ff87f9;
    font-size: 1.4rem;
}

.data-manager-group{
  display: flex;
  position: absolute;
  bottom: 0;
  padding-bottom: 5vh;
  gap: 15px;
}

.export-data-btn button,.import-data-btn button{
  height: 40px;
  width: 250px;
  background-color: #e7ca55;
  font-size: 1.2rem;
}
</style>