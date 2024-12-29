import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export async function connectToDatabase() {
    if (client.isConnected()) {
        return { db: client.db() };
    }

    await client.connect();
    return { db: client.db() };
}
