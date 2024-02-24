<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
import Popup from '../components/Popup.vue';
import {addClient} from '../data/dao';
import {Client,getCurrentDate,verifyClientInfos,formatClient,formatDate} from '../data/tools'
</script>

<template>
<div class="page">
    <TopBar previousPage="/" />
    <div class="page-content">
        <SideBar />
        <div class="content">
            <div class="title"><p>Ajouter un client</p></div>
            <div class="add-form">
                <div class="input-group">
                    <input type="text" class="input input-half" name="lastName" placeholder="prenom (obligatoire)" v-model.trim="client.firstName">
                    <input type="text" class="input input-half" name="firstName" placeholder="nom (obligatoire)" v-model.trim="client.lastName">
                </div>
                <input type="text" class="input" name="birthday" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="date de naissance (obligatoire)" v-model.trim="client.birthday" @blur="client.birthday = formatDate(client.birthday)">
                <input type="email" class="input" name="email" placeholder="email" v-model.trim="client.email">
                <div class="input-group">
                    <input type="text" class="input input-half" name="city" placeholder="ville" v-model.trim="client.city">
                    <input type="number" class="input input-half" name="postalCode" placeholder="code postal" v-model="client.postalCode">
                </div>
                <input type="text" class="input" name="job" placeholder="fonction" v-model.trim="client.job">
                <input type="text" class="input" name="registrationDate" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="date d'inscription" v-model.trim="client.registrationDate" @blur="client.registrationDate = formatDate(client.registrationDate)">
                
                <div class="lbl-input">
                    <div class="txt-loyalty">Points de fidélité</div>
                </div>
                <input type="number" class="input input-mini" name="loyaltyPoints" v-model="client.loyaltyPoints" min="0" placeholder="0">
                <div class="valid-btn"><button class="btn" @click="onValidate">Valider</button></div>
            </div>
        </div>
        <SideBar />
        <Popup v-if="showPopup" :msg=popupMsg :acceptMethod=popupAcceptMethod v-click-outside />
    </div>
</div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            client : {} as Client,
            showPopup : false as boolean,
            popupMsg : "" as string,
            popupAcceptMethod : this.hidePopup() as Function
        }
    },
    methods: {
        onValidate(){  
            const errorList = verifyClientInfos(this.client)
            if(errorList.length <= 0){
                this.client = formatClient(this.client);

                // Ajouter la date de derniere visite
                this.client.lastVisitDate = getCurrentDate();
                if(this.client.registrationDate == undefined){
                    this.client.registrationDate = getCurrentDate();
                }
                if(this.client.loyaltyPoints == undefined){
                    this.client.loyaltyPoints = 0;
                }

                addClient(this.client);  
                this.changePopupMethod(this.clientAdded)
                this.setPopup('Le client '+ this.client.firstName + " " + this.client.lastName +' à été ajouté avec succès !');
            }else{
                this.setPopup(errorList[0]);
            }
        },
        hidePopup(){
            this.showPopup = false;
        },
        changePopupMethod(method:Function){
            this.popupAcceptMethod = method;
        },
        setPopup(msg:string){
            this.popupMsg = msg;
            this.showPopup = true;
        },
        clientAdded(){
            this.hidePopup();
            this.$router.push("/");
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
    width: 2.3vw;
    text-align: center;
    height: 3.7vh;
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
    margin-top: 1vh;
    margin-bottom: .5vh;
}

</style>