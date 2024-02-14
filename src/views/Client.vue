<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
</script>

<template>
<div class="page">
    <TopBar />
    <div class="page-content">
      <SideBar />
      <div class="content">
        <div class="title">Id : {{ clientId }}</div>
      </div>
      <SideBar />
    </div>
</div>
</template>

<script lang="ts">
export default {
    props: {
        clientId:{
            type: Number,
            required: true,
            default: -1
        }
    },
};
</script>

<style scoped>

</style>