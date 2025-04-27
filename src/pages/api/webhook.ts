import { Request, Response } from 'express';
import { createHmac } from 'crypto';
import { paymentService } from '../../services/paymentService';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const signature = req.headers['x-paystack-signature'];
    if (!signature) {
      return res.status(400).json({ message: 'No signature found' });
    }

    // Verify the signature
    const hash = createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const event = req.body;

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        await paymentService.handleSuccessfulPayment(event.data.reference);
        break;
      case 'transfer.success':
        // Handle successful transfer
        break;
      case 'refund.processed':
        // Handle refund
        break;
      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    return res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 