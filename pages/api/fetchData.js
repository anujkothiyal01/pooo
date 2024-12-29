// pages/api/fetchData.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  console.log('Received request method:', req.method);

  if (req.method === 'GET') {
    try {
      console.log('Connecting to database...');
      await client.connect();
      const db = client.db();
      const collection = db.collection('submissions');
      const data = await collection.find().toArray();
      console.log('Data fetched successfully:', data);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error during database fetch:', error);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    console.error('Invalid request method:', req.method);
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
