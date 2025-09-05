import { initializeDatabase, runQuery, allQuery } from '../database/init.js';

// Initialize database
await initializeDatabase();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://nbta.institute');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const applications = await allQuery(
        'SELECT * FROM affiliate_applications ORDER BY created_at DESC'
      );
      res.status(200).json({ applications });
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        fullName, email, phone, website, audienceSize, audienceDescription, 
        motivation, socialMediaHandles
      } = req.body;

      // Validate required fields
      if (!fullName || !email) {
        return res.status(400).json({ error: 'Full name and email are required' });
      }

      const id = crypto.randomUUID();
      const result = await runQuery(
        `INSERT INTO affiliate_applications (
          id, full_name, email, phone, website, social_media_handles, 
          audience_size, audience_description, motivation
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id, fullName, email, phone, website, 
          JSON.stringify(socialMediaHandles), audienceSize, audienceDescription, motivation
        ]
      );

      res.status(201).json({ 
        message: 'Application submitted successfully',
        id 
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ error: 'Failed to submit application' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
