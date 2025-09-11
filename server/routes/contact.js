import express from 'express';
import { sendContactMessage } from '../services/emailService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await sendContactMessage({ name, email, subject, message, phone });

    if (result?.success === false) {
      return res.status(500).json({ error: result.error || 'Failed to send message' });
    }

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact send error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;


