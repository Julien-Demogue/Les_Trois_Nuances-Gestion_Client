<template>
    <div class="add-form">
        <div class="input-group">
            <input type="text" class="input input-half" name="nom" placeholder="nom" required>
            <input type="text" class="input input-half" name="prenom" placeholder="prenom" required>
        </div>
        <input type="text" class="input" name="dateNaissance" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="date de naissance" required>
        <input type="email" class="input" name="email" placeholder="email">
        <div class="input-group">
            <input type="text" class="input input-half" name="ville" placeholder="ville">
            <input type="number" class="input input-half" name="cp" placeholder="code postal">
        </div>
        <input type="text" class="input" name="fonction" placeholder="fonction">
        <input type="text" class="input" name="dateInscription" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="date d'inscription" >
        <div class="valid-btn"><button class="btn">Valider</button></div>
    </div>
</template>

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