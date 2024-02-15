import Cnx from './cnx';

async function addClient(name: string): Promise<void> {
    const client = await Cnx.connect();
  
    const db = client.db('Gestion_client');
    const collection = db.collection('client');
  
    await collection.insertOne({ name });
  
    await Cnx.close(client);
}

export default {addClient};