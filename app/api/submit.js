// pages/api/submit.js
import { connectToDatabase } from '../../utils/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required.' });
        }

        try {
            const { db } = await connectToDatabase();

            const result = await db.collection('users').insertOne({
                name,
                email,
                createdAt: new Date(),
            });

            res.status(201).json({ message: 'Data saved successfully', data: result });
        } catch (error) {
            res.status(500).json({ error: 'Error saving data to the database.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
