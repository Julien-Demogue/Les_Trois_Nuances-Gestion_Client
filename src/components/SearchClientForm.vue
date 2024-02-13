<template>
    <div class="search-form">
        <div class="input-group">
            <input type="text" class="input input-half" name="nom" placeholder="nom" required>
            <input type="text" class="input input-half" name="prenom" placeholder="prenom" required>
        </div>
        <div class="results-count">X résultats / Y clients</div>
        <div class="results-container">
            test
        </div>
    </div>
</template>

<style scoped>
.search-form {
    width: 100%;
    height: 65vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.results-count {
    color: #9D9797;
    font-size: 1rem;
    font-weight: bold;
}

.results-container{
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #79C8F6;
    margin-top: 5vh;
    padding: 2%;
    border-radius: 12px;
    overflow-y: auto;
    border: #5271FF solid 2px; 
}
</style>