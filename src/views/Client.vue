<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
import EditBtn from '../components/EditBtn.vue';
import { removeClient,getClient,Client } from '../data/dao';
</script>

<template>
<div class="page">
    <TopBar />
    <div class="page-content">
      <SideBar />
      <div class="content">
        <div class="title">
          <p>{{ client.firstName }} {{ client.lastName }}</p>
          <!-- <EditBtn /> -->
        </div>
        <div class="informations">
          <div class="birthDate">
            <p>{{ client.birthday }} ([age])</p>
            <!-- <EditBtn /> -->
          </div>
          <div class="city">
            <p>Ville : {{ client.city }}</p>
            <!-- <EditBtn /> -->
          </div>
          <div class="cp">
            <p>Code Postal : {{ client.postalCode }}</p>
            <!-- <EditBtn /> -->
          </div>
          <div class="funcion">
            <p>Fonction : {{ client.job }}</p>
            <!-- <EditBtn /> -->
          </div>
          <div class="lastConsultation">
            <p>Dernier rendez-vous : {{ client.lastVisitDate }}</p> 
            <!-- <EditBtn /> -->
          </div>
          <div class="loyaltyPoints">
            <p>Point de fidélité : </p>
            <!-- <EditBtn /> -->
          </div>
        </div>
        <div class="delBtn"><button @click="onRemove" class="btn">Supprimer le client</button></div>
      </div>
      <SideBar />
    </div>
</div>
</template>

<script lang="ts">
export default {
    data() {
      return {
        client : {} as Client,
      }
    },
    props: {
        clientId:{
            type: Number,
            required: true,
            default: -1,
        }
    },
    methods:{
      onRemove(){
        removeClient(this.clientId);
        this.$router.push({name: 'menu'});
      }
    },
    mounted(){
      getClient(this.clientId).then((client) => {
        this.client = client;
      });
    }
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