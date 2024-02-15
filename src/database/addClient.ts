import { connect, close } from './cnx';

export async function addClient(name: string): Promise<void> {
    const client = await connect();
  
    const db = client.db('Gestion_client');
    const collection = db.collection('client');
  
    await collection.insertOne({ name });
  
    await close(client);
  }