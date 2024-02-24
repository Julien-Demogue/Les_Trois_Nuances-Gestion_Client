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
export default function verifyClientInfos(client:Client) : boolean{
  let errorList = [];
  if(client.firstName == "" || client.lastName == "" || client.birthday == ""){
    errorList.push("Champs obligatoires");
  }
  if(!verifyName(client.firstName) || !verifyName(client.lastName)){
    errorList.push("Nom invalide");
  }
  if(!verifyDate(client.birthday)){
    errorList.push("Date de naissance invalide");
  }
  if(!verifyEmail(client.birthday)){
    errorList.push("Email invalide");
  }
  if(!verifyName(client.city)){
    errorList.push("Ville invalide");
  }
  if(!verifyPostalCode(client.postalCode)){
    errorList.push("Code postal invalide");
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
  client.city = formatName(client.city);
  return client;
}

// Verifie la validite d'un nom
function verifyName(name:string) : boolean{
  const regex = new RegExp("^[a-zA-Z]*$");
  return regex.test(name);
}

// Verifie la validite d'un email
function verifyEmail(email:string): boolean{
  const regex = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
  return regex.test(email);
}

// verifie la validite d'une date
function verifyDate(date:string) : boolean{
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return false;
  }

  return true;
}

// verifie la validite d'un code postal
function verifyPostalCode(postalCode:number): boolean {
  return postalCode.toString().length === 5 && !isNaN(postalCode);
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
function formatDate(date:string) : string{
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('fr-FR');
}

// Calcule l'age a partire d'une date de naissance
export function calculateAge(birthday:string) : number{
  const now = new Date();
  const birthdayDate = new Date(birthday);
  return  now.getFullYear() - birthdayDate.getFullYear() ;
}

// Recupere la date actuelle en format fr-FR
export function getCurrentDate() : string{
  return new Date().toLocaleDateString('fr-FR');
}