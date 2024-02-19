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
        </div>
        <div class="informations">
          <div class="birthday info-block">
            <p class="info-title">Age</p>
            <p class="info">[age] ans ({{ client.birthday }})</p>
          </div>
          <div class="city info-block">
            <p class="info-title">Ville</p>
            <p class="info">{{ client.city }}</p>
          </div>
          <div class="cp info-block">
            <p class="info-title">Code Postal</p>
            <p class="info">{{ client.postalCode }}</p>
          </div>
          <div class="funcion info-block">
            <p class="info-title">Fonction</p>
            <p class="info">{{ client.job }}</p>
          </div>
          <div class="lastConsultation info-block">
            <p class="info-title">Dernier rendez-vous</p> 
            <p class="info">{{ client.lastVisitDate }}</p>
          </div>
          <div class="loyaltyPoints info-block">
            <div><p class="info-title">Points de fidélité</p></div>
            <div><p class="info">{{ client.loyaltyPoints }}</p></div>
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
  width: 80%;
}

.informations p{
  text-align: center;
  color:#5e5e5e;
  font-size: 1.8rem;
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

.info-title{
  color:#339adf !important;
}

.info-block{
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>