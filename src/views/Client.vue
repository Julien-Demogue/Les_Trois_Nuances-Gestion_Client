<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
import EditBtn from '../components/EditBtn.vue';
</script>

<template>
<div class="page">
    <TopBar />
    <div class="page-content">
      <SideBar />
      <div class="content">
        <div class="title">
          <p>Id : {{ id }}</p>
          <!-- <EditBtn /> -->
        </div>
        <div class="informations">
          <div class="birthDate">
            <p>[dateNaissance] ([age])</p>
            <!-- <EditBtn /> -->
          </div>
          <div class="city">
            <p>Ville : </p>
            <!-- <EditBtn /> -->
          </div>
          <div class="cp">
            <p>Code Postal : </p>
            <!-- <EditBtn /> -->
          </div>
          <div class="funcion">
            <p>Fonction : </p>
            <!-- <EditBtn /> -->
          </div>
          <div class="lastConsultation">
            <p>Dernière consultation :</p> 
            <!-- <EditBtn /> -->
          </div>
          <div class="loyaltyPoints">
            <p>Point de fidélité : </p>
            <!-- <EditBtn /> -->
          </div>
        </div>
        <div class="delBtn"><button class="btn">Supprimer le client</button></div>
      </div>
      <SideBar />
    </div>
</div>
</template>

<script lang="ts">
export default {
    props: {
        id:{
            type: Object,
            required: true,
        }
    },
};
</script>

<style scoped>
.informations {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.informations div{
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.informations p{
  text-align: center;
  color:#9D9797;
  font-size: 2rem;
  font-weight: bold;
}

.delBtn button{
  margin-top: 10vh;
  width: 230px;
  height: 50px;
  background-color: #FD6666;
  font-size: 1.4rem;
}

.title{
  display: flex;
  flex-direction: row;
}
</style>