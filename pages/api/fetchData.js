import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to MongoDB (no need to check isConnected)
      await client.connect();
      const db = client.db();
      const collection = db.collection('submissions'); // Replace with your actual collection name

      // Fetch the data from the collection
      const data = await collection.find({}).toArray();

      // Send the data as response
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      res.status(500).json({ error: 'Database error' });
    } finally {
      // Avoid closing the connection on every request in serverless functions
      // client.close(); // Uncomment if you want to close the client, but generally, it's better to reuse the connection
    }
  } else {
    // Handle other HTTP methods, like POST, PUT, etc.
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
