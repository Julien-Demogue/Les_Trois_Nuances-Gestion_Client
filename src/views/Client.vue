<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
// import EditBtn from '../components/EditBtn.vue';
import { removeClient,getClient,editClient } from '../data/dao';
import {Client} from '../data/tools'
</script>

<template>
<div class="page">
    <TopBar />
    <div class="page-content">
      <SideBar />
      <div class="content">
        <div class="title">
          <p v-if="!editMode">{{ client.firstName }} {{ client.lastName }}</p>
          <div class="input-group" v-if="editMode" style="padding-bottom: 5vh;">
            <input type="text" class="input input-half" name="lastName" placeholder="prenom" v-model="client.firstName">
            <input type="text" class="input input-half" name="firstName" placeholder="nom" v-model="client.lastName" >
          </div>
        </div>
        <div class="informations">
          <div class="birthday info-block" v-if="client.birthday != undefined || editMode">
            <p class="info-title">Age</p>
            <p class="info" v-if="!editMode">[age] ans ({{ client.birthday }})</p>
            <input type="text" class="input" name="birthday" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="date de naissance" v-model="client.birthday" v-if="editMode">
          </div>
          <div class="city info-block" v-if="client.city != undefined || editMode">
            <p class="info-title">Ville</p>
            <p class="info" v-if="!editMode">{{ client.city }}</p>
            <input type="text" class="input input-half" name="city" v-model="client.city" v-if="editMode">
          </div>
          <div class="cp info-block" v-if="client.postalCode != undefined || editMode">
            <p class="info-title">Code Postal</p>
            <p class="info" v-if="!editMode">{{ client.postalCode }}</p>
            <input type="number" class="input input-half" name="postalCode" v-model="client.postalCode" v-if="editMode">
          </div>
          <div class="funcion info-block" v-if="client.job != undefined || editMode">
            <p class="info-title">Fonction</p>
            <p class="info" v-if="!editMode">{{ client.job }}</p>
            <input type="text" class="input" name="job" v-model="client.job" v-if="editMode">
          </div>
          <div class="lastConsultation info-block" v-if="client.lastVisitDate != undefined || editMode">
            <p class="info-title">Dernier rendez-vous</p> 
            <p class="info">{{ client.lastVisitDate }}</p>
          </div>
          <div class="email info-block" v-if="client.email != undefined || editMode">
            <div><p class="info-title">Email</p></div>
            <div><p class="info" v-if="!editMode">{{ client.email }}</p></div>
            <input type="email" class="input" name="email" v-model="client.email" v-if="editMode">
          </div>
          <div class="loyaltyPoints info-block">
            <div><p class="info-title">Points de fidélité</p></div>
            <div><p class="info">{{ client.loyaltyPoints }}</p></div>
          </div>
          <div class="registrationDate info-block" v-if="client.registrationDate != undefined || editMode">
            <div><p class="info-title">Date d'inscription</p></div>
            <div><p class="info" v-if="!editMode">{{ client.registrationDate }}</p></div>
            <input type="text" class="input" name="registrationDate" onfocus="(this.type='date')" onblur="(this.type='text')" v-model="client.registrationDate" v-if="editMode">
          </div>
        </div>
        <div class="btnGroup" v-if="!editMode">
          <div class="delBtn"><button @click="onRemove" class="btn">Supprimer le client</button></div>
          <div class="editBtn"><button @click="switchEditMode(true)" class="btn">Modifier le client</button></div>
        </div>
        <div class="btnGroup" v-else>
          <div class="cancelBtn"><button @click="cancelEdit" class="btn">Annuler</button></div>
          <div class="validBtn"><button @click="applyChanges" class="btn">Valider</button></div>
        </div>
        
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
        editMode : false as boolean,
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
      },
      switchEditMode(active:boolean){
        this.editMode = active;
      },
      cancelEdit(){
        this.reloadPage();
      },
      applyChanges(){       
        editClient(this.clientId, this.client);
        this.reloadPage();
      },
      reloadPage(){
        location.reload();
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

.btnGroup {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.delBtn,.editBtn,.validBtn,.cancelBtn {
  margin-left: 3%;
  margin-right: 3%;
}

.delBtn button, .editBtn button, .validBtn button, .cancelBtn button {
  margin-top: 10vh;
  width: 230px;
  height: 50px;
  font-size: 1.4rem;
}

.delBtn button, .cancelBtn button {
  background-color: #FD6666;
}

.editBtn button{
  background-color: #F6DC73;
}

.validBtn button{
  background-color: #24e25d;
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

.info-block input{
  text-align: center;
  text-indent: 0 !important;
  width: 15vw !important;
  height: 2.2vh !important;
}

.input-half{
  height: 2.2vh !important;
  text-align: center;
}
</style>