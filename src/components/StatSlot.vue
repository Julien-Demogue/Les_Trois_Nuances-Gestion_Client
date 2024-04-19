<script setup lang="ts">
</script>

<template>
<div class="stat-box" @click="handleClick">
    <div class="stat-title">{{ title }}</div>
    <div class="stat-content">{{ content }}</div>
</div>
</template>

<script lang="ts">
export default {
    props: {
        title : {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isAnimating: false,
        }
    },
    methods: {
        handleClick() {
            if (!this.isAnimating) {
                this.isAnimating = true;
                this.$el.classList.add('spin-anim');
                setTimeout(() => {
                    this.$el.classList.remove('spin-anim');
                    this.isAnimating = false;
                }, 500);
            }
        }
    }
}
</script>

<style scoped>
.stat-box{
    width: 350px;
    height: 150px;
    border: #fd2cf3 solid 2px;
    border-radius: 20px;
    background: #f5a9ff;
    display: grid;
    grid-template-rows: 1fr 1.5fr;
    justify-items: center;
    align-items: center;
    text-align: center;
    gap: 10px;
    padding: 10px;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}

.stat-box:hover{
    transform: scale(110%);
}

.stat-title{
    font-size: 1.4rem;
    width: 100%;
    color: #ffffff;
}

.stat-content{
    font-size: 2.2rem;
    font-weight: bold;
    width: 100%;
    color: #ffffff;
}

.spin-anim{
    animation-name: spin;
    animation-duration: 500ms;
    animation-iteration-count: 1;
    animation-timing-function: linear; 
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>