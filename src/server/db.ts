import {MongoClient} from "mongodb";
import {MONGO_URI, DATABASE_NAME} from "./config";

let connectedClient = null;

export const connectClient = async () => {
    if (connectedClient) {
        return connectedClient.db(DATABASE_NAME);
    }
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    await client.db(DATABASE_NAME).command({ping: 1});
    console.log("Database is connected");
    connectedClient = client;
    return connectedClient.db(DATABASE_NAME);
};

export const stopClient = async () => {
    await connectedClient.close();
}