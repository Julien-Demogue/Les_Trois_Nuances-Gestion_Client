import fs from 'fs/promises';
import path from 'path';
import { Client } from './tools';  // Assurez-vous que ce type est correctement défini dans tools.ts

const dataPath = './';
const clientsFile = 'clients.json';
const absolutePath = path.resolve(dataPath+clientsFile);

// let writeQueue = Promise.resolve(); // File d'attente pour les écritures

async function safeWriteFile(path: string,fileName:string , data: string): Promise<void> {
  const tempPath = `${path}temp_${fileName}`;

  try {
    // Écriture dans le fichier temporaire
    await fs.writeFile(tempPath, data);
    console.log(`Fichier temporaire ${tempPath} écrit avec succès.`);

    // Remplacement du fichier original par le fichier temporaire
    await fs.rename(tempPath, path + fileName);
    console.log(`Fichier original ${fileName} remplacé avec succès.`);
  } catch (err) {
    // En cas d'erreur, suppression du fichier temporaire s'il existe
    console.log(`Erreur lors de l'écriture ou du renommage : ${err}`);
    try {
      await fs.unlink(tempPath);
      console.log(`Fichier temporaire ${tempPath} supprimé après erreur.`);
    } catch (unlinkErr) {
      console.log(`Erreur lors de la suppression du fichier temporaire : ${unlinkErr}`);
    }
    throw err; // Remonter l'erreur
  }
}

export async function addClient(client: Client): Promise<void> {
  try {
    const data = await fs.readFile(absolutePath, 'utf8');
    const clients: Client[] = JSON.parse(data);
    
    const previousID = Math.max(...clients.map(c => c.id));
    client.id = previousID !== -Infinity ? previousID + 1 : 0;
    
    clients.push({ ...client });
    
    await safeWriteFile(dataPath,clientsFile, JSON.stringify(clients, null, 2));
    console.log(`Ligne ${client.id} ajoutée avec succès !`);
  } catch (err) {
    console.error(err);
  }
}

export async function removeClient(id: number): Promise<void> {
  try {
    const data = await fs.readFile(absolutePath, 'utf8');
    const clients: Client[] = JSON.parse(data);
    const index = clients.findIndex(client => client.id == id);
    if (index !== -1) {
      clients.splice(index, 1);
      await safeWriteFile(dataPath,clientsFile, JSON.stringify(clients, null, 2));
      console.log(`Ligne '${id}' supprimée avec succès !`);
    } else {
      console.error(`Ligne avec l'ID '${id}' non trouvée.`);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function editClient(id: number, client: Client): Promise<void> {
  try {
    const data = await fs.readFile(absolutePath, 'utf8');
    const clients: Client[] = JSON.parse(data);

    const index = clients.findIndex(client => client.id.toString() == id.toString());
    if (index !== -1) {
      clients[index] = { ...clients[index], ...client, id };
      const jsonData = JSON.stringify(clients, null, 2);
      await safeWriteFile(dataPath,clientsFile, jsonData);
      console.log(`Ligne ${id} modifiée avec succès !`);
    } else {
      console.log(`Ligne avec l'ID ${id} non trouvée.`);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function editClientProperty(id: number, property: string, value: any): Promise<void> {
  try {
    const data = await fs.readFile(absolutePath, 'utf8');
    const clients: Client[] = JSON.parse(data);
    
    const index = clients.findIndex(client => client.id.toString() == id.toString());
    if (index !== -1) {
      (clients[index] as any)[property] = value;
      await safeWriteFile(dataPath,clientsFile, JSON.stringify(clients, null, 2));
      console.log(`Propriété "${property}" du client ${id} modifiée avec succès !`);
    } else {
      console.log(`Client avec l'ID ${id} non trouvé.`);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function getClients(): Promise<Client[]> {
  try {
    const data = await fs.readFile(absolutePath, 'utf8');
    const clients: Client[] = JSON.parse(data);
    return clients;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getClient(id: number): Promise<Client | undefined> {
  try {
    const data = await fs.readFile(absolutePath, 'utf8');
    const clients: Client[] = JSON.parse(data);
    
    const client = clients.find(client => client.id.toString() == id.toString());
    return client;
  } catch (err) {
    alert("erreur");
    console.error(err);
    throw err;
  }
}
