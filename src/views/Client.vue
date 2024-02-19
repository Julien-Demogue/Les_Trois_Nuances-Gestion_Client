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
          <div class="birthday info-block" v-if="client.birthday != ''">
            <p class="info-title">Age</p>
            <p class="info">[age] ans ({{ client.birthday }})</p>
          </div>
          <div class="city info-block" v-if="client.city != ''">
            <p class="info-title">Ville</p>
            <p class="info">{{ client.city }}</p>
          </div>
          <div class="cp info-block" v-if="client.postalCode != 0">
            <p class="info-title">Code Postal</p>
            <p class="info">{{ client.postalCode }}</p>
          </div>
          <div class="funcion info-block" v-if="client.job != ''">
            <p class="info-title">Fonction</p>
            <p class="info">{{ client.job }}</p>
          </div>
          <div class="lastConsultation info-block" v-if="client.lastVisitDate != ''">
            <p class="info-title">Dernier rendez-vous</p> 
            <p class="info">{{ client.lastVisitDate }}</p>
          </div>
          <div class="loyaltyPoints info-block">
            <div><p class="info-title">Points de fidélité</p></div>
            <div><p class="info">{{ client.loyaltyPoints }}</p></div>
          </div>
          <div class="email info-block" v-if="client.email != ''">
            <div><p class="info-title">Email</p></div>
            <div><p class="info">{{ client.email }}</p></div>
          </div>
          <div class="registrationDate info-block" v-if="client.registrationDate != ''">
            <div><p class="info-title">Date d'inscription</p></div>
            <div><p class="info">{{ client.registrationDate }}</p></div>
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
  color:#746c6c;
  font-size: 1.9rem;
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
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>