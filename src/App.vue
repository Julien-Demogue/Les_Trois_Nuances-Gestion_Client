<script setup lang="ts">
import TopBar from './components/TopBar.vue'
</script>

<template>
  <div class="page">
    <TopBar/>
    <div class="page-content">
      <div class="left-bar"></div>
      <div class="editable-div">

      </div>
      <div class="right-bar"></div>
    </div>
  </div>
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
