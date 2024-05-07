<script setup lang="ts">
</script>

<template>
    <div class="side-bar">
        <img src="../img/partie_droite.png" v-if="side == 'right' ">
        <img src="../img/partie_gauche.png" v-if="side == 'left' ">
    </div>
</template>

<script lang="ts">
export default {
    props: {
        side:String
    }
}
</script>

<style scoped>
.side-bar {
    background-color: #f5a9ff;
}

.side-bar img{
    user-select: none;
    width: 100%;
    height: 100%;
}
</style>