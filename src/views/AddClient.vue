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
                <input type="text" class="input input-half" name="firstName" placeholder="nom" v-model="firstName" >
                <input type="text" class="input input-half" name="lastName" placeholder="prenom" v-model="lastName">
            </div>
            <input type="text" class="input" name="birthDate" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="date de naissance" v-model="birthDate">
            <input type="email" class="input" name="email" placeholder="email" v-model="email">
            <div class="input-group">
                <input type="text" class="input input-half" name="city" placeholder="ville" v-model="city">
                <input type="number" class="input input-half" name="postalCode" placeholder="code postal" v-model="postalCode">
            </div>
                <input type="text" class="input" name="job" placeholder="fonction" v-model="job">
                <input type="text" class="input" name="registeryDate" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="date d'inscription" v-model="registeryDate">
                <div class="valid-btn"><button class="btn" @click="onValidate">Valider</button></div>
            </div>
      </div>
      <SideBar />
    </div>
</div>
</template>

<script lang="ts">
import {addClient} from '../data/dao';

export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            birthDate: '',
            email: '',
            city: '',
            postalCode: '',
            job: '',
            registeryDate: ''
        }
    },
    methods: {
        onValidate(){  
            const firstName = this.firstName.trim();
            const lastName = this.lastName.trim();
            const birthDate = this.birthDate.trim();
            const email = this.email.trim();
            const city = this.city.trim();
            const postalCode = this.postalCode.trim();
            const job = this.job.trim();
            const registeryDate = this.registeryDate.trim();

            if(firstName == '' || lastName == '' || birthDate == ''){
                alert('Veuillez remplir tous les champs obligatoires');
            }
            else{
                const client = {
                    "firstname":firstName,
                    "lastname":lastName,
                    "birthdate":birthDate,
                    "email":email,
                    "city":city,
                    "postalcode":postalCode,
                    "job":job,
                    "registerydate":registeryDate
                }
                addClient(client);  
                alert('Le client '+ lastName + " " + firstName +' à été ajouté avec succès !');
                this.$router.push("/");
            }
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