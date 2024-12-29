import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    // Check if both fields are provided
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
      // Connect to MongoDB (no need to check isConnected)
      await client.connect();
      const db = client.db();
      const collection = db.collection('submissions'); // Replace with your actual collection name

      // Insert the form data into the collection
      await collection.insertOne({ name, email });

      // Send success response
      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error connecting to the database:', error);
      res.status(500).json({ error: 'Database error' });
    } finally {
      // Avoid closing the connection on every request in serverless functions
      // client.close(); // Uncomment if you want to close the client, but generally, it's better to reuse the connection
    }
  } else {
    // Handle other HTTP methods, like GET, PUT, etc.
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
