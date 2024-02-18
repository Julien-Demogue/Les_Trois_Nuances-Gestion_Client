import fs from 'fs';
import { Collection } from 'mongodb';
const clientsFile = 'C:\\Users\\julien\\Desktop\\Gestion-client\\src\\data\\clients.json';

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
    const newId = Math.max(...clients.map((client:any) => client.id)) + 1;

    // ajouter le nouveau client a l'objet
    clients.push({ id: newId, ...client});

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
    const index = clients.findIndex((client:any) => client.id === id);

    // Si l'index est trouve, supprimer la ligne
    if (index !== -1) {
      clients.splice(index, 1);

      // ecrire le nouveau contenu JSON dans le fichier
      fs.writeFile(clientsFile, JSON.stringify(clients,null,2), err => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`Ligne ${id} supprimee avec succes !`);
      });
    } else {
      console.log(`Ligne avec l'ID ${id} non trouvee.`);
    }
  });
}

export function editClient(id:Number, client:any) {
  // Lire le fichier JSON
  fs.readFile(clientsFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // analyser le JSON en objet
    const clients = JSON.parse(data);

    // Trouver l'index de la ligne a modifier
    const index = clients.findIndex((client:any) => client.id === id);

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

export function getClients() {
  // Lire le fichier JSON
  fs.readFile(clientsFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    // analyser le JSON en objet
    const clients = JSON.parse(data);

    // afficher la liste des clients
    console.log(clients);
  });
}