<script setup lang="ts">
const handleClick = (method: Function | null) => {
  if (method) {
    method();
  }
};
</script>

<template>
    <div class="popup">
        <div class="popup-bg">
            <div class="popup-wrapper">
                <div class="popup-content">
                    <div v-html=msg class="popup-msg">     
                    </div>
                    <div class="popup-btn">
                        <div class="group-btn" v-if="confirmation">
                            <div class="cancel-btn"><button class="btn" @click="handleClick(cancelMethod)" >Non</button></div>
                            <div class="accept-btn"><button class="btn" @click="handleClick(acceptMethod)" >Oui</button></div>           
                        </div> 
                        <div class="ok-btn" v-else>
                            <button class="btn" @click="handleClick(acceptMethod)" >OK</button>
                        </div>              
                    </div>
                </div>
            </div>
        </div>   
    </div>
</template>

<script lang="ts">
export default {
    props:{
        confirmation:{
            type:Boolean,
            default:false,
            required:false
        },
        msg:{
            type:String,
            required:true
        },
        acceptMethod:{
            type:Function,
            required:true,  
            default:null 
        },
        cancelMethod:{
            type:Function,
            required:false,
            default:null
        }
    },
};
</script>

<style scoped>
.popup{
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.308);
    display: table;
    transition: opacity 0.3s ease;
}

.popup-bg{
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.popup-wrapper{
    display: table-cell;
    vertical-align: middle;
}

.popup-content{
    width: 25%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #f5a9ff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    border: #fd2cf3 solid 3px;
    max-height: 50vh;
}

.popup-msg{
    max-height: 40vh;
    overflow-y: auto;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    display: flex;
    justify-content: center;
    font-size: 1.4rem;
}

.group-btn, .popup-btn{
    padding-top: 3vh;
    display:flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}

.accept-btn button, .cancel-btn button, .ok-btn button{
    width: 6.5vw;
    height: 2.5vw;
    font-size: 1.2rem;
}

.accept-btn button{
    background-color: #24e25d;
}

.cancel-btn button{
    background-color: #FD6666;
}

.ok-btn button{
    background-color: #e7ca55;
}
</style>