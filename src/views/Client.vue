<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
import Popup from '../components/Popup.vue';
import { removeClient,getClient,editClient,editClientProperty } from '../dao';
import {Client,verifyClientInfos,formatClient,formatDate, getCurrentDate,ageGroups} from '../tools'
</script>

<template>
<div class="page">
    <TopBar :showReturnBtn="false" v-if="editMode"/>
    <TopBar previousPage="/search-client" v-else/>
    <div class="page-content">
      <SideBar side="left" />
      <div class="content">
        <div class="title">
          <p v-if="!editMode">{{ client.firstName }} {{ client.lastName }}</p>
          <div class="input-group" v-if="editMode" style="padding-bottom: 5vh;">
            <input type="text" class="input input-half" name="lastName" placeholder="prenom" v-model.trim="client.firstName">
            <input type="text" class="input input-half" name="firstName" placeholder="nom" v-model.trim="client.lastName" >
          </div>
        </div>
        <div class="separator-trio">
          <div class="element-group">

          <div class="lastConsultation info-block" v-if="client.lastVisitDate.length > 0 || editMode">
            <div class="info-line">
              <p class="info-title">Dernier passage</p>
              <div class="fast-edit-btn"><button class="btn resetPts" @click="onRefreshLastVisit"><img class="icon" src="../img/refresh.png" alt="Refresh icons created by Dave Gandy - Flaticon"></button></div> 
            </div>
            <div class="info-line">
              <p class="info">{{ client.lastVisitDate[client.lastVisitDate.length-1] }}</p>
              <div class="fast-edit-btn"><button class="btn visitHistory" @click="showVisitHistory"><img class="icon" src="../img/history.png" alt="Historyicon created by Tempo_doloe - Flaticon"></button></div> 
            </div>
          </div>

          <div class="loyaltyPoints info-block">
            <div class="info-line">
              <div><p class="info-title">Points de fidélité</p></div>
              <div class="fast-edit-btn"><button class="btn resetPts" @click="onResetLP"><img class="icon" src="../img/refresh.png" alt="Refresh icons created by Dave Gandy - Flaticon"></button></div>
            </div> 
            <div class="info-line">
              <div class="fast-edit-btn"><button class="btn removePts" @click="removeLP"><img class="icon" src="../img/moins.png" alt="Minus icons created by Freepik - Flaticon"></button></div>
              <div><p class="info">{{ client.loyaltyPoints }}</p></div>
              <div class="fast-edit-btn"><button class="btn addPts" @click="addLP"><img class="icon" src="../img/plus.png" alt="Plus icons created by srip - Flaticon"></button></div>
            </div>     
          </div>

          <div class="registrationDate info-block" v-if="client.registrationDate != '' || editMode">
            <div><p class="info-title">Date d'inscription</p></div>
            <div><p class="info" v-if="!editMode">{{ client.registrationDate }}</p></div>
            <input type="text" class="input" name="registrationDate" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="date d'inscription" v-model.trim.trim="client.registrationDate" @blur="client.registrationDate = formatDate(client.registrationDate)" v-if="editMode">
          </div>
          
          <div class="birthday info-block" v-if="client.age != '' || editMode">
            <p class="info-title">Tranche d'âge</p>
            <p class="info" v-if="!editMode">{{ client.age }}</p>
            <select class="input" v-model="client.age" :class="{'select-placeholder':client.age==''}" v-if="editMode">
                <option class="option" selected value="">Tranche d'âge</option>
                <option v-for="ageGroup in ageGroups" class="option" :value="ageGroup">{{ ageGroup }}</option>
            </select>
          </div>

          <div class="gender radio-info-block" v-if="client.gender != '' || editMode">
            <p class="info-title">Genre</p>
            <p class="info" v-if="!editMode">{{ client.gender }}</p>
            <div class="radio-input" v-if="editMode">
                <div class="radio"><input type="radio" name="gender" value="Homme" v-model="client.gender"> Homme</div>
                <div class="radio"><input type="radio" name="gender" value="Femme" v-model="client.gender"> Femme</div>
            </div>
          </div>

          <div class="funcion info-block" v-if="client.job != '' || editMode">
            <p class="info-title">Situation</p>
            <p class="info" v-if="!editMode">{{ client.job }}</p>
            <input type="text" class="input" name="job" v-model.trim="client.job" v-if="editMode">
          </div>

        </div>
          <div class="element-group">

            <div class="address info-block" v-if="client.address != '' || editMode">
              <p class="info-title">Adresse</p>
              <p class="info" v-if="!editMode">{{ client.address }}</p>
              <input type="text" class="input" name="address" v-model.trim="client.address" v-if="editMode">
            </div>

            <div class="city info-block" v-if="client.city != '' || editMode">
              <p class="info-title">Ville</p>
              <p class="info" v-if="!editMode">{{ client.city }}</p>
              <input type="text" class="input" name="city" v-model.trim="client.city" v-if="editMode">
            </div>

            <div class="cp info-block" v-if="client.postalCode != '' || editMode">
              <p class="info-title">Code Postal</p>
              <p class="info" v-if="!editMode">{{ client.postalCode }}</p>
              <input type="text" class="input" name="postalCode" v-model.trim="client.postalCode" v-if="editMode">
            </div>

            <div class="telephone info-block" v-if="client.telephone != '' || editMode">
              <div><p class="info-title">Téléphone</p></div>
              <div><p class="info" v-if="!editMode">{{ client.telephone }}</p></div>
              <input type="tel" class="input" name="telephone" v-model.trim="client.telephone" v-if="editMode">
            </div>

            <div class="color info-block" v-if="client.color != '' || editMode">
              <p class="info-title">Coloration</p>
              <p class="info" v-if="!editMode">{{ client.color }}</p>
              <input type="text" class="input" name="color" v-model.trim="client.color" v-if="editMode">
            </div>

            <div class="cutStyle info-block" v-if="client.cutStyle != '' || editMode">
              <p class="info-title">Type de coupe</p>
              <p class="info" v-if="!editMode">{{ client.cutStyle }}</p>
              <input type="text" class="input" name="cutStyle" v-model.trim="client.cutStyle" v-if="editMode">
            </div>

          </div>

          <div class="element-group">
            <div><p class="info-title">Produits achetés</p></div>
            <div class="add-product">
              <input type="text" class="input" name="products" v-model.trim="newProduct">
              <div class="fast-edit-btn"><button class="btn addPts" @click="addProduct()"><img class="icon" src="../img/plus.png" alt="Plus icons created by srip - Flaticon"></button></div>
            </div>
            <div class="pdt-container" v-if="client.products.length > 0">
              <div v-for="(product,i) in client.products" :key="i" class="product-line">
                <p class="info" :title="product">- {{ product }}</p>
                <div class="fast-edit-btn"><button class="btn removeProduct" @click="removeProduct(Number(i))"><img class="icon" src="../img/moins.png" alt="Minus icons created by Freepik - Flaticon"></button></div>
              </div>
            </div>
          </div>
        </div>

        <br><br>

        <div class="element-group">

          <div class="email info-block" v-if="client.email != '' || editMode">
            <div><p class="info-title">Email</p></div>
            <div><p class="info" v-if="!editMode">{{ client.email }}</p></div>
            <input type="email" class="input" name="email" v-model.trim="client.email" v-if="editMode">
          </div>

          <div class="specifications info-block" v-if="client.specifications != '' || editMode">
            <div><p class="info-title">Spécifications</p></div>
            <div><p class="info textarea-display" v-if="!editMode">{{ client.specifications }}</p></div>
            <textarea class="text-area" v-model.trim="client.specifications" v-if="editMode" ></textarea>
          </div>

        </div>
        

        <div class="btnGroup" v-if="!editMode">
          <div class="delBtn"><button @click="onRemove" class="btn">Supprimer le client</button></div>
          <div class="editBtn"><button @click="switchEditMode(true)" class="btn">Modifier le client</button></div>
        </div>
        <div class="btnGroup" v-else>
          <div class="cancelBtn"><button @click="onCancelEdit" class="btn">Annuler</button></div>
          <div class="validBtn"><button @click="onApply" class="btn">Valider</button></div>
        </div>
        
      </div>
      <SideBar side="right" />
      <Popup v-if="showPopup" :confirmation=confirmationPopup :msg=popupMsg :acceptMethod=popupAcceptMethod :cancelMethod=popupCancelMethod />
    </div>
</div>
</template>

<script lang="ts">
export default {
    data() {
      return {
        client : {} as Client,
        editMode : false as boolean,
        showPopup : false as boolean,
        popupMsg : "" as string,
        popupAcceptMethod : this.hidePopup() as Function,
        popupCancelMethod : this.hidePopup() as Function,
        confirmationPopup : true as boolean,
        newProduct : ""
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
      showVisitHistory(){
        let msg = "Dernieres visites" + "<br>";
        for (let i = this.client.lastVisitDate.length - 1; i >= 0; i--) {
          msg += "<br>" + this.client.lastVisitDate[i] ;
        }
        this.changeAcceptPopupMethod(this.hidePopup);
        this.setPopup(msg);
      },
      onResetLP(){
        let msg = "Voulez-vous vraiment réinitialiser les points de fidélité de ce client ?";
        this.changeAcceptPopupMethod(this.resetLP);
        this.changeCancelPopupMethod(this.hidePopup);
        this.setPopup(msg,true);
      },
      onRefreshLastVisit(){
        let msg = "Êtes-vous sûr de vouloir actualiser la date de dernière visite du client ?";
        this.changeAcceptPopupMethod(this.refreshLastVisit);
        this.changeCancelPopupMethod(this.hidePopup);
        this.setPopup(msg,true);
      },
      addProduct(){
        if(this.newProduct == "")return;
        const productList = this.client.products;
        productList.push(this.newProduct);
        editClientProperty(this.client.id,"products",productList);
        this.newProduct = "";
      },
      removeProduct(id:number){
        const productList = this.client.products;
        productList.splice(id,1);
        editClientProperty(this.client.id,"products",productList);
      },
      addLP(){
        editClientProperty(this.client.id,"loyaltyPoints",this.client.loyaltyPoints+1);
        this.client.loyaltyPoints++;
      },
      removeLP(){
        if(this.client.loyaltyPoints > 0){
          editClientProperty(this.client.id,"loyaltyPoints",this.client.loyaltyPoints-1);
          this.client.loyaltyPoints--;
        }
      },
      resetLP(){
        editClientProperty(this.client.id,"loyaltyPoints",0);
        this.client.loyaltyPoints = 0;
        this.hidePopup();
      },
      refreshLastVisit(){
        const history = this.client.lastVisitDate;
        let today = getCurrentDate();
        this.client.lastVisitDate.push(today);
        editClientProperty(this.client.id,"lastVisitDate",history);
        this.hidePopup();
      },
      onRemove(){
        let msg = "Voulez vous vraiment supprimer le client " + this.client.firstName + " " + this.client.lastName + " ?";
        msg += "<br><br>Cette action est définitive !";

        this.changeAcceptPopupMethod(this.applyRemove);
        this.changeCancelPopupMethod(this.hidePopup);

        this.setPopup(msg,true);
      },
      applyRemove(){
        let msg = "Le client " + this.client.firstName + " " + this.client.lastName + " a été supprimé ! ";

        removeClient(this.clientId);
        this.setPopup(msg);
        this.changeAcceptPopupMethod(this.appliedRemove);
      },
      appliedRemove(){
        this.$router.push({name:'menu'});
      },
      switchEditMode(active:boolean){
        this.editMode = active;
      },
      onCancelEdit(){
        let msg = "Voulez vous vraiment annuler les changements effectués ? ";

        this.changeAcceptPopupMethod(this.applyCancelEdit);
        this.changeCancelPopupMethod(this.hidePopup);
        this.setPopup(msg,true);
      },
      applyCancelEdit(){
        this.reloadPage();
      },
      onApply(){       
        let msg = "Voulez vous vraiment appliquer les changements effectués sur le client ?";

        let errorList = verifyClientInfos(this.client);
        if(errorList.length > 0){
          this.setPopup(errorList[0]);
          this.changeAcceptPopupMethod(this.hidePopup);
        }
        else{
          this.changeAcceptPopupMethod(this.applyChanges);
          this.changeCancelPopupMethod(this.hidePopup);
          this.setPopup(msg,true);
        }
      },
      applyChanges(){
        this.client = formatClient(this.client);
        editClient(this.clientId, this.client);
        let msg = "Client modifié";
        this.setPopup(msg,false);
        this.changeAcceptPopupMethod(this.reloadPage);
      },
      reloadPage(){
        location.reload();
      },
      hidePopup(){
        this.showPopup = false;
      },
      changeAcceptPopupMethod(method:Function){
        this.popupAcceptMethod = method;
      },
      changeCancelPopupMethod(method:Function){
        this.popupCancelMethod = method;
      },
      setPopup(msg:string,confirmation:boolean = false){
        this.popupMsg = msg;
        this.showPopup = true;
        this.confirmationPopup = confirmation;
      },
    },
    beforeMount(){
      getClient(this.clientId).then((client) => {
        if(client != undefined) {
          this.client = client;
        }
      });
    },
};
</script>

<style scoped>
.separator-trio{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
}

.element-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.pdt-container{
  border: solid black 1px;
  width: 18vw;
  max-height: 50vh;
  border-radius: 8px;
  border: #ff87f9 solid 2px; 
  background-color: #f5a9ff;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
}

.add-product{
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 10px;
  gap: 10px;
}

.product-line{
  display: flex;
  justify-content:space-between;
}

.product-line p{
  font-size: 1.6vw !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.product-line p:hover{
  cursor: pointer;
}

.textarea-display {
  white-space: pre-line;
  word-wrap: break-word;
}

.info{
  text-align: center;
  color:#746c6c;
  font-size: 1.9vw;
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
  text-align: center;
  font-weight: bold;
  color:#fd4d97 !important;
  font-size: 1.8vw !important;
}

.info-block{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 17vw;
}

.radio-info-block, .info-block{
  margin-bottom: 2rem;
}

.info-block input, .info-block select{
  text-align: center;
  text-indent: 0 !important;
  width: 15vw !important;
  height: 2.2vh !important;
}

.info-block textarea {
  width: 15vw!important;
}

.info-line{
  display: flex;
  gap: 10px;
}

.input-half{
  height: 2.2vh !important;
  text-align: center;
}

.fast-edit-btn button{
    width: 30px;
    height: 30px;
    border-radius: 4px;
}

.fast-edit-btn{
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

.addPts{
  background-color: #8DEF0F;
}

.removePts,.removeProduct{
  background-color: #FD6666;
}

.removeProduct{
  width: 23px !important;
  height: 23px !important;
}

.resetPts,.refreshLC{
  background-color: #F6DC73;
}

.visitHistory{
  background-color: #ffa32b;
}

.icon{
  height: 70%;
}
</style>../tools../../public/data/dao../dao