import fs from 'fs';
import { Collection } from 'mongodb';
const clientsFile = 'C:\\Users\\julien\\Desktop\\Gestion-client\\src\\data\\clients.json';

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

export function addClient(client:any) {
  // Lire le fichier JSON
  fs.readFile(clientsFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // analyser le JSON en objet
    const clients = JSON.parse(data);

    // Generer un nouvel ID unique
    const newId = Math.max(...clients.map((client:Client) => client.id)) + 1;

    // Ajouter la date de derniere visite
    const lastVisitDate = new Date().toLocaleDateString('fr-FR');

    // ajouter le nouveau client a l'objet
    clients.push({ id: newId, ...client, lastVisitDate:lastVisitDate});

    // ecrire le nouveau contenu JSON dans le fichier
    fs.writeFile(clientsFile, JSON.stringify(clients,null,2), err => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Ligne ${newId} ajoutee avec succes !`);
    });
  });
}

export function removeClient(id:Number) {
  // Lire le fichier JSON
  fs.readFile(clientsFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // analyser le JSON en objet
    const clients = JSON.parse(data);

    // Trouver l'index de la ligne a supprimer
    const index = clients.findIndex((client:Client) => client.id == id);

    // Si l'index est trouve, supprimer la ligne
    if (index !== -1) {
      clients.splice(index, 1);

      // ecrire le nouveau contenu JSON dans le fichier
      fs.writeFile(clientsFile, JSON.stringify(clients,null,2), err => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`Ligne '${id}' supprimee avec succes !`);
      });
    } else {
      console.error(`Ligne avec l'ID '${id}' non trouvee.`);
    }
  });
}

export function editClient(id:Number, client:Collection) {
  // Lire le fichier JSON
  fs.readFile(clientsFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // analyser le JSON en objet
    const clients = JSON.parse(data);

    // Trouver l'index de la ligne a modifier
    const index = clients.findIndex((client:Client) => client.id == id);

    // Si l'index est trouve, modifier la ligne
    if (index !== -1) {
      clients[index] = { ...client, id };

      // ecrire le nouveau contenu JSON dans le fichier
      fs.writeFile(clientsFile, JSON.stringify(clients,null,2), err => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`Ligne ${id} modifiee avec succes !`);
      });
    } else {
      console.log(`Ligne avec l'ID ${id} non trouvee.`);
    }
  });
}

export function getClients(): Promise<Client[]> {
  // Lire le fichier JSON
  return new Promise((resolve, reject) => {
    fs.readFile(clientsFile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // Analyser le JSON en objet
      const clients = JSON.parse(data);

      // Résoudre la promesse avec le tableau de clients
      resolve(clients);
    });
  });
}

export function getClient(id: Number): Promise<Client> {
  return new Promise((resolve, reject) => {
    // Lire le JSON
    fs.readFile(clientsFile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // analyser le JSON en objet
      const clients = JSON.parse(data);

      // Trouver l'index de la ligne a modifier
      const index = clients.findIndex((client:any) => client.id == id);

      resolve(clients[index]); 
    });  
  });
}