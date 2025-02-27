import fs from 'fs/promises';
import path from 'path';
import { Client } from './tools';  // Ensure that this type is correctly defined in tools.ts
import { Mutex } from 'async-mutex';

const dataPath = './';
const clientsFile = 'clients.json';
const absolutePath = path.resolve(dataPath + clientsFile);
const mutex = new Mutex();

async function safeWriteFile(path: string, fileName: string, data: string): Promise<void> {
  const tempPath = `${path}temp_${fileName}`;
  const backupPath = `${path}backup_${fileName}`;

  try {
    // Backup the original file
    await fs.copyFile(path + fileName, backupPath);
    console.log(`Original file ${fileName} backed up successfully.`);

    // Write to the temporary file
    await fs.writeFile(tempPath, data);
    console.log(`Temporary file ${tempPath} written successfully.`);

    // Verify the integrity of the temporary file
    const tempData = await fs.readFile(tempPath, 'utf8');
    if (tempData !== data) {
      throw new Error(`Temporary file ${tempPath} integrity check failed.`);
    }

    // Check that the temporary file exists before renaming
    const tempFileExists = await fs.access(tempPath).then(() => true).catch(() => false);
    if (tempFileExists) {
      // Replace the original file with the temporary file
      await fs.rename(tempPath, path + fileName);
      console.log(`Original file ${fileName} replaced successfully.`);
    } else {
      throw new Error(`Temporary file ${tempPath} does not exist.`);
    }
  } catch (err) {
    // Restore the backup in case of error
    console.log(`Error during writing or renaming: ${err}`);
    try {
      await fs.copyFile(backupPath, path + fileName);
      console.log(`Original file ${fileName} restored from backup.`);
    } catch (restoreErr) {
      console.log(`Error restoring original file from backup: ${restoreErr}`);
    }

    // Delete the temporary file if it exists
    try {
      await fs.unlink(tempPath);
      console.log(`Temporary file ${tempPath} deleted after error.`);
    } catch (unlinkErr) {
      console.log(`Error deleting temporary file: ${unlinkErr}`);
    }
    throw err; // Rethrow the error
  }
}

export async function addClient(client: Client): Promise<void> {
  await mutex.runExclusive(async () => {
    try {
      const data = await fs.readFile(absolutePath, 'utf8');
      const clients: Client[] = JSON.parse(data);

      client.id = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 0;

      clients.push({ ...client });

      await safeWriteFile(dataPath, clientsFile, JSON.stringify(clients, null, 2));
      console.log(`Client ${client.id} added successfully!`);
    } catch (err) {
      console.error(err);
    }
  });
}

export async function removeClient(id: number): Promise<void> {
  await mutex.runExclusive(async () => {
    try {
      const data = await fs.readFile(absolutePath, 'utf8');
      const clients: Client[] = JSON.parse(data);
      const index = clients.findIndex(client => client.id == id);
      if (index !== -1) {
        clients.splice(index, 1);
        await safeWriteFile(dataPath, clientsFile, JSON.stringify(clients, null, 2));
        console.log(`Client '${id}' removed successfully!`);
      } else {
        console.error(`Client with ID '${id}' not found.`);
      }
    } catch (err) {
      console.error(err);
    }
  });
}

export async function editClient(id: number, client: Client): Promise<void> {
  await mutex.runExclusive(async () => {
    try {
      const data = await fs.readFile(absolutePath, 'utf8');
      const clients: Client[] = JSON.parse(data);

      const index = clients.findIndex(client => client.id.toString() == id.toString());
      if (index !== -1) {
        clients[index] = { ...clients[index], ...client, id };
        const jsonData = JSON.stringify(clients, null, 2);
        await safeWriteFile(dataPath, clientsFile, jsonData);
        console.log(`Client ${id} edited successfully!`);
      } else {
        console.log(`Client with ID ${id} not found.`);
      }
    } catch (err) {
      console.error(err);
    }
  });
}

export async function editClientProperty(id: number, property: string, value: any): Promise<void> {
  await mutex.runExclusive(async () => {
    try {
      const data = await fs.readFile(absolutePath, 'utf8');
      const clients: Client[] = JSON.parse(data);

      const index = clients.findIndex(client => client.id.toString() == id.toString());
      if (index !== -1) {
        (clients[index] as any)[property] = value;
        await safeWriteFile(dataPath, clientsFile, JSON.stringify(clients, null, 2));
        console.log(`Property "${property}" of client ${id} edited successfully!`);
      } else {
        console.log(`Client with ID ${id} not found.`);
      }
    } catch (err) {
      console.error(err);
    }
  });
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
    console.error(err);
    throw err;
  }
}
