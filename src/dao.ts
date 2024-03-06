import fs from 'fs';
import {Client} from './tools'
import path from 'path';
const clientsFile = './public/clients.json';
const absolutePath = path.resolve(clientsFile);

export function addClient(client:Client) {
  // Lire le fichier JSON
  fs.readFile(absolutePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // analyser le JSON en objet
    const clients = JSON.parse(data);

    // Generer un nouvel ID unique
    const previousID = Math.max(...clients.map((client:Client) => client.id))
    let newId = 0
    if(previousID != -Infinity) {
      newId = Math.max(...clients.map((client:Client) => client.id)) + 1;
    }
    client.id = newId;

    // ajouter le nouveau client a l'objet
    clients.push({...client});

    // ecrire le nouveau contenu JSON dans le fichier
    fs.writeFile(absolutePath, JSON.stringify(clients,null,2), err => {
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
  fs.readFile(absolutePath, 'utf8', (err, data) => {
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
      fs.writeFile(absolutePath, JSON.stringify(clients,null,2), err => {
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

export function editClient(id:Number, client:Client) {
  // Lire le fichier JSON
  fs.readFile(absolutePath, 'utf8', (err, data) => {
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
      fs.writeFile(absolutePath, JSON.stringify(clients,null,2), err => {
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

export function editClientProperty(id: number, property: string, value: any) {
  // Lire le fichier JSON
  fs.readFile(absolutePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Analyser le JSON en objet
    const clients = JSON.parse(data);

    // Trouver l'index du client a modifier
    const index = clients.findIndex((client: Client) => client.id === id);

    // Si l'index est trouve, modifier la propriete
    if (index !== -1) {
      clients[index][property] = value;

      // Ecrire le nouveau contenu JSON dans le fichier
      fs.writeFile(absolutePath, JSON.stringify(clients, null, 2), err => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`Propriete "${property}" du client ${id} modifiee avec succes !`);
      });
    } else {
      console.log(`Client avec l'ID ${id} non trouve.`);
    }
  });
}

export function getClients(): Promise<Client[]> {
  // Lire le fichier JSON
  return new Promise((resolve, reject) => {
    fs.readFile(absolutePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // Analyser le JSON en objet
      const clients = JSON.parse(data);

      // Resoudre la promesse avec le tableau de clients
      resolve(clients);
    });
  });
}

export function getClient(id: Number): Promise<Client> {
  return new Promise((resolve, reject) => {
    // Lire le JSON
    fs.readFile(absolutePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // analyser le JSON en objet
      const clients = JSON.parse(data);

      // Trouver l'index de la ligne a modifier
      const index = clients.findIndex((client:Client) => client.id == id);

      resolve(clients[index]); 
    });  
  });
}