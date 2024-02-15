const { MongoClient } = require('mongodb');

const mongoURL = 'mongodb://localhost:27017/gestion_client';

async function connect(): Promise<typeof MongoClient> {
    try {
        const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        return client;
    }
    catch (err) {
        alert(err);
    }
}
  
async function close(client: typeof MongoClient): Promise<void> {
    try{
        await client.close();
    }
    catch (err){
        alert(err);
    }
}

export default { connect, close };
