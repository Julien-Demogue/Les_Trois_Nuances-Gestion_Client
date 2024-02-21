<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
import {addClient} from '../data/dao';
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
                    <input type="text" class="input input-half" name="lastName" placeholder="prenom" v-model="firstName">
                    <input type="text" class="input input-half" name="firstName" placeholder="nom" v-model="lastName" >
                </div>
                <input type="text" class="input" name="birthday" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="date de naissance" v-model="birthday">
                <input type="email" class="input" name="email" placeholder="email" v-model="email">
                <div class="input-group">
                    <input type="text" class="input input-half" name="city" placeholder="ville" v-model="city">
                    <input type="number" class="input input-half" name="postalCode" placeholder="code postal" v-model="postalCode">
                </div>
                <input type="text" class="input" name="job" placeholder="fonction" v-model="job">
                <input type="text" class="input" name="registrationDate" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="date d'inscription" v-model="registrationDate">
                
                <div class="lbl-input">
                    <div class="txt-loyalty">Points de fidélité :&nbsp;</div>
                    <input type="number" class="input input-mini" name="loyaltyPoints" v-model="loyaltyPoints">
                </div>
                <div class="valid-btn"><button class="btn" @click="onValidate">Valider</button></div>
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
            firstName: '',
            lastName: '',
            birthday: '',
            email: '',
            city: '',
            postalCode: null,
            job: '',
            registrationDate: '',
            loyaltyPoints: 0,
        }
    },
    methods: {
        onValidate(){  
            const firstName = this.firstName.trim();
            const lastName = this.lastName.trim();
            const birthday = this.birthday.trim();
            const email = this.email.trim();
            const city = this.city.trim();
            const postalCode = this.postalCode;
            const job = this.job.trim();
            const registrationDate = this.registrationDate.trim();
            const loyaltyPoints = this.loyaltyPoints;

            if(firstName == '' || lastName == '' || birthday == ''){
                alert('Veuillez remplir tous les champs obligatoires');
            }
            else{
                const client = {
                    "firstName":firstName,
                    "lastName":lastName,
                    "birthday":birthday,
                    "email":email,
                    "city":city,
                    "postalCode":postalCode,
                    "job":job,
                    "registrationDate":registrationDate,
                    "loyaltyPoints":loyaltyPoints
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
    width: 40%;
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

.input-mini{
    width: 3vw;
    text-align: center;
}

.txt-loyalty{
    color: #746c6c;
    font-size: 1.2rem;
    font-weight: bold;
}

.lbl-input{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>