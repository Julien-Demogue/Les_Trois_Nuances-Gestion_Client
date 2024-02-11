<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import ContentHolder from './components/ContentHolder.vue'
</script>

<template>
    <!-- <div class="page">
      <TopBar :showReturnBtn="false"/>
      <div class="page-content">
        <div class="left-bar"></div>
        <ContentHolder title="Menu" contentToShow="menu"/>
        <div class="right-bar"></div>
      </div>
    </div> -->

    <div class="page">
      <TopBar :showReturnBtn="true"/>
      <div class="page-content">
        <div class="left-bar"></div>
        <ContentHolder title="Ajouter un client" contentToShow="add"/>
        <div class="right-bar"></div>
      </div>
    </div>

    <!-- <div class="page">
      <TopBar :showReturnBtn="true"/>
      <div class="page-content">
        <div class="left-bar"></div>
        <ContentHolder title="Rechercher un client" contentToShow="search"/>
        <div class="right-bar"></div>
      </div>
    </div> -->
</template>

<style scoped>
  .page{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .page-content{
    display:grid;
    grid-template-columns: 1fr 4fr 1fr;
    height: 100%;
  }

  .left-bar, .right-bar{
    background-color: #C1E7FD;
  }
</style>
