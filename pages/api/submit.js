// pages/api/submit.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  // Log the HTTP method of the incoming request
  console.log('Received request method:', req.method);

  if (req.method === 'POST') {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
      await client.connect();
      const db = client.db();
      const collection = db.collection('submissions');
      await collection.insertOne({ name, email });

      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    // Log the error when method is not POST
    console.error('Invalid method:', req.method);
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
