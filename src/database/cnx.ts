const { MongoClient } = require('mongodb');

const mongoURL = 'mongodb://localhost:27017/Gestion_client';

export async function connect(): Promise<typeof MongoClient> {
    const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client;
  }
  
  export async function close(client: typeof MongoClient): Promise<void> {
    await client.close();
  }