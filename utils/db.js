// utils/db.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useUnifiedTopology: true, // This option is still supported
});

export async function connectToDatabase() {
  // Connect to MongoDB (no need to check isConnected)
  await client.connect();
  return { db: client.db() }; // Returns the connected database
}
