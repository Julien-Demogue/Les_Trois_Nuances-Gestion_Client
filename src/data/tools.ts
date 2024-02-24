export interface Client{
    id:number;
    firstName:string;
    lastName:string;
    birthday:string;
    email:string;
    city:string;
    postalCode:number;
    job:string;
    registrationDate:string;
    lastVisitDate:string;
    loyaltyPoints:number;
}

// Verifie si les informations du client sont correctes
export function verifyClientInfos(client:Client) : boolean{
  let errorList = [];
  if(client.firstName == undefined || client.lastName == undefined || client.birthday == undefined){
    errorList.push("Champs obligatoires non renseignés");
  }
  if((client.firstName!= undefined && client.lastName!= undefined && !verifyName(client.firstName) || !verifyName(client.lastName))){
    errorList.push("Nom invalide");
  }
  if(client.birthday != undefined && !verifyDate(client.birthday)){
    errorList.push("Date de naissance invalide");
  }
  if(client.email != undefined && !verifyEmail(client.email)){
    errorList.push("Email invalide");
  }
  if(client.city != undefined && !verifyName(client.city)){
    errorList.push("Ville invalide");
  }
  if(client.postalCode != undefined && !verifyPostalCode(client.postalCode)){
    errorList.push("Code postal invalide");
  }
  if(client.registrationDate != undefined && !verifyDate(client.registrationDate)){
    errorList.push("Date d'enregistrement invalide");
  }

  if(errorList.length > 0){
    errorList.forEach(error => {
      alert(error)
    });
    return false;
  }
  return true;
}

// Formate les informations devant etre formatees d'un client
export function formatClient(client:Client) : Client{
  client.firstName = formatName(client.firstName);
  client.lastName = formatName(client.lastName);
  client.birthday = formatDate(client.birthday);
  if(client.email != undefined) client.email = formatEmail(client.email);
  if(client.city != undefined) client.city = formatName(client.city);
  if(client.job != undefined) client.job = formatName(client.job);
  if(client.registrationDate != undefined) client.job = formatDate(client.registrationDate);
  return client;
}

// Verifie la validite d'un nom
function verifyName(name:string) : boolean{
  const regex = /^[a-zA-Z -]*$/;
  return regex.test(name);
}

// Verifie la validite d'un email
function verifyEmail(email:string): boolean{
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
}

// verifie la validite d'une date
function verifyDate(date:string) : boolean{
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  return regex.test(date);
}

// verifie la validite d'un code postal
function verifyPostalCode(postalCode:number): boolean {
  var regex = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
  return regex.test(postalCode.toString());
}

// Formate un nom
function formatName(name:string): string{
  const nameParts = name.split(/([ -])+/);
  const formattedParts = nameParts.map(part => {
    return part.substring(0, 1).toUpperCase() + part.substring(1).toLowerCase();
  });
  return formattedParts.join(' ');
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
    alert("Annversaire !");
    years+=1;
  }

  return years;
}

// Recupere la date actuelle en format fr-FR
export function getCurrentDate() : string{
  return new Date().toLocaleDateString('fr-FR');
}