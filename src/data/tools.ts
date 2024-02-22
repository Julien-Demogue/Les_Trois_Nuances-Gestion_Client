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
function verifyEmail(email:String){

}

// verifie la validite d'une date
function verifyDate(date:String){

}

// verifie la validite d'un code postal
function verifyPostalCode(postalCode:Number){

}

// Formate un nom
function formatName(name:String){

}

// Formate une date
function formatDate(date:String){

}

// Calcule l'age a partire d'une date de naissance
function calculateAge(birthday:String){

}