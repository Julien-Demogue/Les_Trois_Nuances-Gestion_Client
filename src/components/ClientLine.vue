<script setup lang="ts">
const mouseClick = (id:number) => {
    alert("clicked "+ id);
};
</script>

<template>
<div class="line" @click="mouseClick(id)">
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
    min-height: 6vh;
    width: 100%;
    border-radius: 8px;
    align-items: center;
    margin-bottom: 5px;
}

.line:hover{
    border: rgba(0, 0, 0, 0.389) solid 0.5px; 
    width: 99%;
    box-shadow: 0 5px 5px rgba(128, 128, 128, 0.33);
    background-color: #aadffd;
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