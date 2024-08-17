import fs from 'fs/promises';
import path from 'path';
import { Client } from './tools';  // Assurez-vous que ce type est correctement défini dans tools.ts

const clientsFile = 'clients.json';
const absolutePath = path.resolve(clientsFile);

let writeQueue = Promise.resolve(); // File d'attente pour les écritures

async function safeWriteFile(path: string, data: string): Promise<void> {
  writeQueue = writeQueue.then(() => fs.writeFile(path, data));
  await writeQueue; // Retourne la promesse pour attendre la fin de l'écriture
}

export async function addClient(client: Client): Promise<void> {
  try {
    const data = await fs.readFile(absolutePath, 'utf8');
    const clients: Client[] = JSON.parse(data);
    
    const previousID = Math.max(...clients.map(c => c.id));
    client.id = previousID !== -Infinity ? previousID + 1 : 0;
    
    clients.push({ ...client });
    
    await safeWriteFile(absolutePath, JSON.stringify(clients, null, 2));
    console.log(`Ligne ${client.id} ajoutée avec succès !`);
  } catch (err) {
    console.error(err);
  }
}

export async function removeClient(id: number): Promise<void> {
  try {
    const data = await fs.readFile(absolutePath, 'utf8');
    const clients: Client[] = JSON.parse(data);
    
    const index = clients.findIndex(client => client.id === id);
    
    if (index !== -1) {
      clients.splice(index, 1);
      await safeWriteFile(absolutePath, JSON.stringify(clients, null, 2));
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
    
    const index = clients.findIndex(c => c.id === id);
    
    if (index !== -1) {
      clients[index] = { ...client, id };
      await safeWriteFile(absolutePath, JSON.stringify(clients, null, 2));
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
    
    const index = clients.findIndex(client => client.id === id);
    
    if (index !== -1) {
      clients[index][property] = value;
      await safeWriteFile(absolutePath, JSON.stringify(clients, null, 2));
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
    
    return clients.find(client => client.id === id);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
