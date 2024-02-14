<script setup lang="ts">
import ContentHolder from "./ContentHolder.vue";
import TopBar from "./TopBar.vue";
</script>

<template>
<div class="page">
    <TopBar :showReturnBtn=canReturn />
    <div class="page-content">
      <div class="left-bar"></div>
      <ContentHolder :title=pageTitle :getContent=contentToShow />
      <div class="right-bar"></div>
    </div>
</div>
</template>

<script lang="ts">
export default {
    props: {
        pageTitle: {
          type: String,
          required: true,
        },
        contentToShow: {
          type:String,
          required: false,
          default:"blank"
        },
        canReturn:{
          type: Boolean,
          required : false,
          default : true
        },
        clientID:{
          type: Number,
          required : false,
        }
    },
};
</script>

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
    height: 90vh;
  }

  .left-bar, .right-bar{
    background-color: #C1E7FD;
  }
</style>