<script setup lang="ts">

</script>

<template>
    <div class="top-bar">
        <div class="return-slot"><div class="return-btn" v-show="showReturnBtn"><button @click="changePage" class="btn">&lt</button></div></div>
        <div class="firm-name">Les Trois Nuances - Salon de coiffure</div>
        <div class="top-btn-group">
            <div class="menu-btn"><router-link to="/"><button class="btn">Menu</button></router-link></div>
            <div class="exit-btn"><button @click="closeWindow" class="btn">Quitter</button></div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
  props: {
    showReturnBtn: {
      type: Boolean,
      required: false,
      default: true,
    },
    previousPage:{
        type: String,
        required: false,
        default: '/'
    }
  },
  methods: {
    closeWindow() {
      window.close();
    },
    changePage(){
        this.$router.push(this.previousPage);
    }
  },
};
</script>

<style scoped>
    .top-bar{
        background-color: #ff87f9;
        height: 10vh;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    .return-slot{
        display: flex;
        justify-content: left;
        align-items: center;
    }

    .firm-name{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 1.7rem;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif   ;
    }

    .top-btn-group{
        display: flex;
        justify-content: right;
        align-items: center;
    }

    .menu-btn, .exit-btn{
        display: flex;
        align-items: center;
        padding-right: 3%;
    }

    .menu-btn button, .exit-btn button{    
        height: 45px;
        width: 140px;
        color: white;
        font-size: 1rem;
    }

    .menu-btn button{
        background-color: #e7ca55;
    }

    .exit-btn button{
        background-color: #FD6666;
    }

    .return-btn{
        display: flex;
        align-items: center;
        padding-left: 3%;
    }

    .return-btn button{
        height: 40px;
        width: 40px;
        font-size: 1.3rem;
        background-color: #9D9797;
    }
</style>