<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
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
      </div>
      <SideBar />
    </div>
</div>
</template>

<style scoped>
.find-btn button, .add-btn button{
    height: 70px;
    width: 400px;
    background-color: #79C8F6;
    font-size: 1.4rem;
}
</style>