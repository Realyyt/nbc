import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './database/init.js';
import authRoutes from './routes/auth.js';
import affiliateRoutes from './routes/affiliates.js';
import adminRoutes from './routes/admin.js';

const app = express();

// Initialize database
await initializeDatabase();

// Middleware
app.use(cors({
  origin: ['https://nbta.institute', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/affiliates', affiliateRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;