import { MongoClient,ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URL ?? "mongodb://localhost:27017"

export const client = new MongoClient(uri,{
    serverApi:ServerApiVersion.v1
}