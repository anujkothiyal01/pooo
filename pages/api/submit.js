// pages/api/submit.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URL);

export default async function handler(req, res) {
  console.log('Received request method:', req.method);

  if (req.method === 'POST') {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
      console.log('Connecting to database...');
      await client.connect();
      const db = client.db();
      const collection = db.collection('submissions');
      await collection.insertOne({ name, email });
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error during database operation:', error);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    console.error('Invalid request method:', req.method);
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
