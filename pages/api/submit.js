// pages/api/submit.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await client.connect();
      const db = client.db();
      const collection = db.collection('submissions');
      
      // Insert form data into the database
      const { name, email } = req.body;
      const result = await collection.insertOne({ name, email });
      
      res.status(200).json({ message: 'Form submitted successfully', result });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Error submitting form', error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
