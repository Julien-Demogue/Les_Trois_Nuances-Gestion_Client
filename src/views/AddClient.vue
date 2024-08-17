<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
import Popup from '../components/Popup.vue';
import {addClient} from '../dao';
import {Client,getCurrentDate,verifyClientInfos,formatClient,formatDate,ageGroups} from '../tools'
</script>

<template>
<div class="page">
    <TopBar previousPage="/" />
    <div class="page-content">
        <SideBar side="left" />
        <div class="content">
            <div class="title"><p>Ajouter un client</p></div>
          
                <div class="add-form">
                    <div class="input-group">
                        <input type="text" class="input input-half" name="lastName" placeholder="Prénom (obligatoire)" v-model.trim="client.firstName">
                        <input type="text" class="input input-half" name="firstName" placeholder="Nom (obligatoire)" v-model.trim="client.lastName">
                    </div>
                    <div class="input-group">
                        <select class="input input-half" v-model="client.age" :class="{'select-placeholder':client.age==''}" >
                            <option class="option" selected value="">Tranche d'âge</option>
                            <option v-for="ageGroup in ageGroups" class="option" :value="ageGroup">{{ ageGroup }}</option>
                        </select>
                        <input type="text" class="input input-half" name="job" placeholder="Situation" v-model.trim="client.job">
                    </div>
                    <div class="input-group">
                        <input type="email" class="input input-half" name="email" placeholder="Email" v-model.trim="client.email">
                        <input type="tel" class="input input-half" name="telephone" placeholder="Téléphone" v-model.trim="client.telephone">
                    </div>
                    <input type="text" class="input" name="address" placeholder="Adresse" v-model.trim="client.address">
                    <div class="input-group">
                        <input type="text" class="input input-half" name="city" placeholder="Ville" v-model.trim="client.city">
                        <input type="text" class="input input-half" name="postalCode" placeholder="Code postal" v-model="client.postalCode">
                    </div>
                    <input type="text" class="input" name="registrationDate" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="Date d'inscription" v-model.trim="client.registrationDate" @blur="client.registrationDate = formatDate(client.registrationDate)">
                    <textarea class="text-area" placeholder="Spécifications sur le client" v-model.trim="client.specifications"></textarea>
                    <div class="radio-input">
                        <div class="radio"><input type="radio" name="gender" value="Homme" v-model.trim="client.gender"> Homme</div>
                        <div class="radio"><input type="radio" name="gender" value="Femme" v-model.trim="client.gender"> Femme</div>
                    </div>
                    <br>
                    <div class="lbl-input">
                        <div class="txt-loyalty">Points de fidélité</div>
                    </div>
                    <input type="number" class="input input-mini" name="loyaltyPoints" v-model="client.loyaltyPoints" min="0" placeholder="0">
                    <div class="valid-btn"><button class="btn" @click="onValidate">Valider</button></div>
                </div>

                
  
            
        </div>
        <SideBar side="right" />
        <Popup v-if="showPopup" :msg=popupMsg :acceptMethod=popupAcceptMethod />
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
            popupAcceptMethod : this.hidePopup() as Function,
        }
    },
    mounted(){
        this.client.age = "";
    },
    methods: {
        onValidate(){  
            const errorList = verifyClientInfos(this.client)
            if(errorList.length <= 0){
                this.client = formatClient(this.client);

                // Ajouter la date de derniere visite
                this.client.lastVisitDate = []
                this.client.lastVisitDate.push(getCurrentDate());
                this.client.products = [];
                if(this.client.registrationDate == ""){
                    this.client.registrationDate = getCurrentDate();
                }
                if(this.client.loyaltyPoints == undefined){
                    this.client.loyaltyPoints = 0;
                }

                addClient(this.client);  
                this.changePopupMethod(this.clientAdded);
                this.setPopup('Le client '+ this.client.firstName + " " + this.client.lastName +' à été ajouté avec succès !');
            }else{
                this.changePopupMethod(this.hidePopup);
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
.part-separator {
    width: 70%;
    display: grid;
    grid-template-columns: 4fr 1fr;
    gap: 5vw;
}

 .add-form{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
 }

.valid-btn button{ 
    margin-top: 5vh;   
    height: 50px;
    width: 200px;
    background-color: #ff87f9;
    font-size: 1.2rem;
}

.input-mini{
    width: 2.5vw;
    text-align: center;
    height: 3.4vh;
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

</style>../tools../../public/data/dao../dao