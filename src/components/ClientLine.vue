<script setup lang="ts">
import { ref } from 'vue'

const line = ref<HTMLElement | null>(null)

const mouseEnter = () => {
    if (line.value){
        line.value.style.border = "2px solid black";
    }
};

const mouseExit = () => {
    if (line.value){
        line.value.style.border = "";
    }
};
</script>

<template>
<div class="line" id="line" @mouseenter="mouseEnter" @mouseleave="mouseExit">
    <div class="left-side">
        <div class="id element">{{ id }}</div>
        <div class="sep element">|</div>
        <div class="nom element">[Nom]</div>
        <div class="prenom element">[Prenom]</div>
        <div class="ville element">[Ville]</div>
        <div class="age element">[Age]</div>
    </div>
    <div class="right-side">
        <div class="dateDerniereVisite element">[Date derniere visite]</div>
    </div>
</div>
</template>

<script lang="ts">
export default {
    props: {
        id:{
            type: Number,
            required: true
        }
    }
};
</script>

<style focused>
.line{
    display: grid;
    grid-template-columns: 2fr 1fr;
    background-color: #C0E7FD;
    height: 6vh;
    width: 100%;
    border-radius: 8px;
    align-items: center;
    margin-bottom: 5px;
}

.left-side, .right-side{
    display: flex;
}

.left-side{
    margin-left: 10px;
    justify-content: left;
}

.right-side{
    margin-right: 10px;
    justify-content: right;
}

.element{
    margin-right: 10px;
    color: #9D9797;
    font-size: 1.2rem;
    font-weight: bold;
}
</style>