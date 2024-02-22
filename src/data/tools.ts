export interface Client{
    id:Number;
    firstName:String;
    lastName:String;
    birthday:String;
    email:String;
    city:String;
    postalCode:Number;
    job:String;
    registrationDate:String;
    lastVisitDate:String;
    loyaltyPoints:Number;
}

export default function verifyClientInfos(client:Client){

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
function formatName(name:string){

}

// Formate une date
function formatDate(date:string){

}

// Calcule l'age a partire d'une date de naissance
function calculateAge(birthday:string){

}