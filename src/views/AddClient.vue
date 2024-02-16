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
        <div class="title"><p>Ajouter un client</p></div>
        <div class="add-form">
            <div class="input-group">
                <input type="text" class="input input-half" name="nom" placeholder="nom" required>
                <input type="text" class="input input-half" name="prenom" placeholder="prenom" required>
            </div>
            <input type="text" class="input" name="dateNaissance" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="date de naissance" required>
            <input type="email" class="input" name="email" placeholder="email">
            <div class="input-group">
                <input type="text" class="input input-half" name="ville" placeholder="ville">
                <input type="number" class="input input-half" name="cp" placeholder="code postal">
            </div>
                <input type="text" class="input" name="fonction" placeholder="fonction">
                <input type="text" class="input" name="dateInscription" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="date d'inscription" >
                <div class="valid-btn"><button class="btn" @click="onValidate">Valider</button></div>
            </div>
      </div>
      <SideBar />
    </div>
</div>
</template>

<script lang="ts">
export default {
    methods: {
        onValidate(){
            alert('Le client à été ajouté avec succès !');
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
 .add-form{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
 }

.valid-btn button{ 
    margin-top: 6vh;   
    height: 50px;
    width: 200px;
    background-color: #79C8F6;
    font-size: 1.2rem;
}
</style>