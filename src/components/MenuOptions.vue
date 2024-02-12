<template>
    <div class="content">
        <div class="find-btn"><router-link to="/search-client"><button class="btn">Rechercher un client</button></router-link></div>
        <div class="separator"><hr></div>
        <div class="add-btn"><router-link to="/add-client"><button class="btn">Ajouter un client</button></router-link></div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.find-btn button, .add-btn button{
    height: 70px;
    width: 400px;
    background-color: #79C8F6;
    font-size: 1.4rem;
}
</style>