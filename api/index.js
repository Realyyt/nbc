import express from 'express';
import cors from 'cors';
import { createRequire } from 'module';
import { pgInitializeDatabase } from './database/pgInit.js';
const require = createRequire(import.meta.url);
const authRoutes = require('./routes/auth.js');
const affiliateRoutes = require('./routes/affiliates.js');
const adminRoutes = require('./routes/admin.js');

const app = express();

// Initialize database (prefer Postgres if DATABASE_URL is set)
if (process.env.DATABASE_URL) {
  try {
    await pgInitializeDatabase();
    console.log('✅ PostgreSQL schema ensured');
  } catch (e) {
    console.error('PostgreSQL init failed, falling back to SQLite:', e.message);
    const { initializeDatabase } = await import('./database/init.js');
    await initializeDatabase();
  }
} else {
  const { initializeDatabase } = await import('./database/init.js');
  await initializeDatabase();
}

// Middleware
app.use(cors({
  origin: [
    'https://nbta.institute',
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 204
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