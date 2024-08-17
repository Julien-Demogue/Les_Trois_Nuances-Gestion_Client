<script setup lang="ts">
</script>

<template>
<div class="line" @click="openClientPage">
    <div class="left-side">
        <div class="id element">{{ index }}</div>
        <div class="sep element">|</div>
        <div class="firstName element">{{ client.firstName }}</div>
        <div class="lastName element">{{ client.lastName }}</div>
        <div class="element" v-if="client.postalCode != '' || client.city != ''">-</div>
        <div class="postalCode element" v-if="client.postalCode != ''">{{ client.postalCode }}</div>
        <div class="city element" v-if="client.city != ''">{{ client.city }}</div>

    </div>
    <div class="right-side">
        <div class="dateDerniereVisite element">{{ client.lastVisitDate[client.lastVisitDate.length-1] }}</div>
    </div>
</div>
</template>

<script lang="ts">
export default {
    props: {
        client:{
            type: Object,
            required: true
        },
        index:{
            type: Number,
            required: true
        }
    },
    methods: {
        openClientPage(){
            this.$router.push({ name: "client", params: { clientId: this.client.id } });
        }
    },
};
</script>

<style focused>
.line{
    display: grid;
    grid-template-columns: 2fr 1fr;
    background-color: #ffcef0;
    min-height: 6vh;
    width: 95%;
    border-radius: 8px;
    align-items: center;
    margin-bottom: 5px;
}

.line:hover{
    width: 94%;
    box-shadow: 0 5px 5px rgba(128, 128, 128, 0.33);
    background-color: #fdc1eb;
    cursor:pointer;
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
    color: #746c6c;
    font-size: 1.2rem;
    font-weight: bold;
}
</style>