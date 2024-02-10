<script setup lang="ts">
import MainMenu from './MainMenu.vue'
</script>

<template>
    <div class="content-holder">
        <div class="title">{{ title }}</div>
        <div class="content">
            <MainMenu/>
        </div>
    </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
    
<style scoped>
    .content-holder{
        display: flex;
        flex-direction: column;
        padding: 3%;
    }

    .title{
        text-align: center;
        font-size: 2.3rem;
        font-family:Arial, Helvetica, sans-serif;
        color:#5271FF ;
        padding-bottom: 10vh;
    }
</style>