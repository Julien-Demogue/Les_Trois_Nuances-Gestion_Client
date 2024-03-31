export interface Client{
    id:number;
    firstName:string;
    lastName:string;
    birthday:string;
    email:string;
    telephone:string;
    address:string;
    city:string;
    postalCode:string;
    job:string;
    registrationDate:string;
    lastVisitDate:string;
    gender:string;
    loyaltyPoints:number;
    specifications:string;
}

// Verifie si les informations du client sont correctes. renvoie une liste d'erreurs. vide si il tout est bon
export function verifyClientInfos(client:Client) : Array<string> {
  let errorList = [];
  if(client.firstName == undefined || client.lastName == undefined || client.firstName == "" || client.lastName == ""){
    errorList.push("L'un des champs obligatoires n'a pas été rempli."+"<br>"+"(nom ou prénom)");
  }
  if((client.firstName != undefined && client.firstName != "" && !verifyName(client.firstName))){
    errorList.push("Le prénom entré est invalide");
  }
  if(client.lastName != undefined && client.lastName != "" && !verifyName(client.lastName)){
    errorList.push("Le nom entré est invalide");
  }
  if(client.birthday != undefined && client.birthday != "" && !verifyDate(client.birthday)){
    errorList.push("La date de naissance entrée est invalide");
  }
  if(client.email != undefined && client.email != "" && !verifyEmail(client.email)){
    errorList.push("L'email entré est invalide");
  }
  if(client.telephone != undefined && client.telephone != "" && !verifyTel(client.telephone)){
    errorList.push("Le numéro de téléphone entré est invalide");
  }
  if(client.city != undefined && client.city != "" && !verifyName(client.city)){
    errorList.push("La ville entrée est invalide");
  }
  if(client.postalCode != undefined && client.postalCode != "" && !verifyPostalCode(client.postalCode)){
    errorList.push("Le code postal entré est invalide");
  }
  if(client.registrationDate != undefined && client.registrationDate != "" && !verifyDate(client.registrationDate)){
    errorList.push("La Date d'enregistrement entrée est invalide");
  }

  return errorList;
}

// Formate les informations devant etre formatees d'un client
export function formatClient(client:Client) : Client{
  client.firstName = formatName(client.firstName);
  client.lastName = formatName(client.lastName);
  if (client.birthday != undefined) client.birthday = formatDate(client.birthday); else client.birthday = "";
  if(client.email != undefined) client.email = formatEmail(client.email); else client.email = "";
  if(client.telephone != undefined) client.telephone = formatTelephone(client.telephone); else client.telephone = "";
  if(client.address == undefined) client.address = "";
  if(client.postalCode == undefined) client.postalCode = "";
  if(client.city != undefined) client.city = formatName(client.city); else client.city = "";
  if(client.job != undefined) client.job = formatName(client.job); else client.job = "";
  if(client.registrationDate != undefined) client.registrationDate = formatDate(client.registrationDate); else client.registrationDate = "";
  if(client.gender == undefined) client.gender = "";
  if(client.specifications == undefined) client.specifications = "";
  return client;
}

// Verifie la validite d'un nom
function verifyName(name:string) : boolean{
  const regex = /^[a-zA-Zéèêëïîôùûüÿ -]*$/;
  return regex.test(name);
}

// Verifie la validite d'un email
function verifyEmail(email:string): boolean{
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
}

// Verifie la validite d'un telephone
function verifyTel(telephone:string): boolean{
  const regex = /^0[1-9](\s?\d{2}){4}$/;
  return regex.test(telephone);
}

// verifie la validite d'une date
function verifyDate(date:string) : boolean{
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  return regex.test(date);
}

// verifie la validite d'un code postal
function verifyPostalCode(postalCode:string): boolean {
  var regex = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
  return regex.test(postalCode);
}

// Formate un nom
function formatName(name:string): string{
  const nameWithoutDashes = name.replace("-"," ");
  const nameWithoutMultipleSpaces = nameWithoutDashes.replace(/\s+/g, " "); 
  const nameWithDashes = nameWithoutMultipleSpaces.replace(/\s/g, "-");

  const nameParts = nameWithDashes.split(/(-)/);
  const formattedParts = nameParts.map((part) => {
    if (part == "-") {
      return "-";
    }
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  });

  return formattedParts.join("");
}

// Formate une date
export function formatDate(date:string) : string{
  // Cas ou la date est deja valide
  if(verifyDate(date)){return date}

  const parsedDate = new Date(date);

  // Cas ou la date est invalide
  if(parsedDate.toString()=="Invalid Date"){return date}

  return parsedDate.toLocaleDateString('fr-FR');
}

// Formate un email
function formatEmail(email:string) : string{
  return email.toLowerCase();
}

// Formate un telephone
function formatTelephone(telephone:string) : string{
  const cleanedNumber = telephone.replace(/\D/g, '');
  return cleanedNumber.replace(/^0(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})$/, '0$1 $2 $3 $4 $5');
}

// Calcule l'age a partire d'une date de naissance
export function calculateAge(birthday:string) : number{
  const now = new Date();
  const birthdayDate = new Date(birthday.split("/").reverse().join("-"));

  const diffMs = now.getTime() - birthdayDate.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30.44);
  let years = Math.floor(months / 12);

  // Si c'est l'anniversaire de la personne
  if(now.getUTCDate() == birthdayDate.getUTCDate() && now.getUTCMonth() == birthdayDate.getUTCMonth()){
    // alert("Annversaire !");
    years+=1;
  }

  return years;
}

// Permet d'obtenir la difference en annee entre deux dates
function getYearsDiffBetween(date1:Date, date2:Date):number{
  var diff = (date1.getTime() - date2.getTime()) / 1000;
  diff /= (60*60*24);
  const diffInYear = Math.abs(Math.round(diff/365.25));

  return diffInYear;
}

// Permet de transformer un string au au format jj/mm/yyyy en objet date 
function stringToDate(dateString : string) : Date{
  // Separer les jours, mois et annees pour creer un objet date
  const parts = dateString.split("/");
  return (new Date(parts[2]+"-"+parts[1]+"-"+parts[0]));
}

// Recupere la date actuelle en format fr-FR
export function getCurrentDate() : string{
  return new Date().toLocaleDateString('fr-FR');
}

// Permet de recuperer l'age moyen d'une liste de clients
export function getAverageAge(clients:Client[]) : number {
  // initialiser les valeurs a 0
  let totalAge = 0;
  let clientsAmount = 0;

  // Parcourir la liste de clients
  clients.forEach(client => {
    // Verifier si le client a une date d'anniversaire renseignee
    if(client.birthday != ""){
      // Incrementer les valeurs
      clientsAmount++;
      totalAge += calculateAge(client.birthday);
    }
  });

  if(clientsAmount > 0){
    // Renvoyer la moyenne d'age
    return Math.round(totalAge/clientsAmount);
  }
  return 0;
}

// Permet de recuperer le pourcentage d'un genre specifique dans la base
function getAmountOfGender(clients:Client[],gender:string) : number {
  // Initialiser les valeurs
  let amount = 0;
  const totalClients = clients.length;
  
  // Parcourir les clients
  clients.forEach(client => {
    // Incrementer le nombre du genre 
    if(client.gender == gender){
      amount++;
    }
  });

  if(totalClients > 0){
    // Renvoyer le pourcentage du genre
    return Math.round((amount/clients.length)*100);
  }
  return 0;
}

// Permet d'obtenir le pourcentage d'hommes dans la base
export function getMaleAmount(clients:Client[]) : number {
  return getAmountOfGender(clients,"Homme");
}

// Permet d'obtenir le pourcentage de femmes dans la base
export function getFemaleAmount(clients:Client[]) : number {
  return getAmountOfGender(clients,"Femme");
}

// Permet d'obtenir le pourcentage de genre inconnus dans la base
export function getUnknownGenderAmount(clients:Client[]) : number {
  return getAmountOfGender(clients,"");
}

// Permet d'obtenir le pourcentage de clients qui ont ete vus dans l'annee passee
export function getRecentlySeenClientsPercent(clients:Client[]) : number {
  // Arreter si aucun client n'est dans la liste
  if(clients.length == 0) {return 0;}

  // Initialiser le nombre a zero
  let amount = 0;

  // parcourir les clients
  clients.forEach(client => {
    // Recuperer la date actuelle
    const now = new Date();

    // Recuperer la date de derniere visite
    const lastVisitDate = stringToDate(client.lastVisitDate);

    // Incrementer le nombre de clients venus il y a moins d'un an
    if(getYearsDiffBetween(now,lastVisitDate) <= 0){
      amount++;
    }
  })

  // Renvoyer le pourcentage de clients venus dans l'annee
  return Math.round((amount/clients.length)*100);
}

// Permet d'obtenir le pourcentage de clients hommes qui ont ete vus dans l'annee passee
export function getRecentlySeenMalePercent(clients: Client[]) : number{
  // Arreter si aucun client n'est dans la liste
  if(clients.length == 0) {return 0;}

  // Initialiser le nombre a zero
  let amount = 0;
  let maleAmount = 0;

  // parcourir les clients
  clients.forEach(client => {
    // Verifier que le client est un homme
    if(client.gender == "Homme"){
      maleAmount++;

      // Recuperer la date actuelle
      const now = new Date();

      // Recuperer la date de derniere visite
      const lastVisitDate = stringToDate(client.lastVisitDate);

      // Incrementer le nombre d'hommes venus il y a moins d'un an
      if(getYearsDiffBetween(now,lastVisitDate) <= 0){
        amount++;
      }
    }
  })

  // Renvoyer le pourcentage d'hommes venus dans l'annee
  return Math.round((amount/maleAmount)*100);
}

// Permet d'obtenir le pourcentage de clientes femmes qui ont ete vues dans l'annee passee
export function getRecentlySeenFemalePercent(clients: Client[]) : number{
  // Arreter si aucun client n'est dans la liste
  if(clients.length == 0) {return 0;}

  // Initialiser le nombre a zero
  let amount = 0;
  let femaleAmount = 0;

  // parcourir les clients
  clients.forEach(client => {
    // Verifier que le client est un homme
    if(client.gender == "Femme"){
      femaleAmount++;

      // Recuperer la date actuelle
      const now = new Date();

      // Recuperer la date de derniere visite
      const lastVisitDate = stringToDate(client.lastVisitDate);

      // Incrementer le nombre d'hommes venus il y a moins d'un an
      if(getYearsDiffBetween(now,lastVisitDate) <= 0){
        amount++;
      }
    }
  })

  // Renvoyer le pourcentage d'hommes venus dans l'annee
  return Math.round((amount/femaleAmount)*100);
}

// Permet d'obtenir le nombre de clients de clients inscrits dans l'annee
export function getNewClientsAmount(clients: Client[]): number {
  // Arreter si aucun client n'est dans la liste
  if(clients.length == 0) {return 0;}

  // Initialiser le nombre a zero
  let amount = 0;

  // parcourir les clients
  clients.forEach(client => {
    // Recuperer la date actuelle
    const now = new Date();

    // Separer les jours, mois et annees pour creer un objet date
    const parts = client.registrationDate.split("/");
    const registrationDate = new Date(parts[2]+"-"+parts[1]+"-"+parts[0]);

    // Calculer la différence en annees entre l'inscription et maintenant
    var diff = (now.getTime() - registrationDate.getTime()) / 1000;
    diff /= (60*60*24);
    const diffInYear = Math.abs(Math.round(diff/365.25));

    // Incrementer le nombre de clients inscrits il y a moins d'un an
    if(diffInYear <= 0){
      amount++;
    }
  })

  // Renvoyer le nombre de clients inscrits dans l'annee
  return amount;
}

// Permet d'obtenir la provenence departementale principale des clients
export function getDepartmentalProvenance(clients: Client[]): string {
  // Arreter si aucun client n'est dans la liste
  if(clients.length == 0) {return "...";}

  // Initialiser le dictionaire
  const dico : { [key: string]: number } = {};

  // Parcourir les clients
  clients.forEach(client => {
    if(client.postalCode != ""){
      // Regarder si le code postal a deja ete ajoute dans le dictionaire
      if(dico.hasOwnProperty(client.postalCode)){
        // Incrementer le nombre de code postal de ce type
        dico[client.postalCode] += 1;
      }
      else{
        // Initialiser le nombre de code postal de ce type
        dico[client.postalCode] = 1;
      }
    }
  });

  // Arreter si aucun code postal n'a ete trouve
  if(Object.keys(dico).length == 0) {return "..."};

  // Initialiser les variables pour determiner le code postal le plus utilise
  let maxAmount = -Infinity;
  let postalCodeMax = "";

  // Parcourir le dictionaire
  for (const [key, value] of Object.entries(dico)) {
    // Determiner le code postal qui reviens le plus
    if(value > maxAmount) {
      maxAmount = value;
      postalCodeMax = key;
    }
  }

  // Renvoyer le code postal le frequent
  return postalCodeMax;
}