import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'affiliate_system.db');

export const db = new sqlite3.Database(dbPath);

export function initializeDatabase() {
  console.log('🗄️ Initializing database...');

  // Create tables
  db.serialize(() => {
    // Affiliate Applications table
    db.run(`
      CREATE TABLE IF NOT EXISTS affiliate_applications (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        website TEXT,
        audience_size INTEGER NOT NULL,
        audience_description TEXT NOT NULL,
        motivation TEXT NOT NULL,
        social_media_handles TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        reviewed_by TEXT,
        reviewed_at DATETIME,
        rejection_reason TEXT
      )
    `);

    // Affiliates table
    db.run(`
      CREATE TABLE IF NOT EXISTS affiliates (
        id TEXT PRIMARY KEY,
        user_id TEXT UNIQUE NOT NULL,
        application_id TEXT NOT NULL,
        affiliate_code TEXT UNIQUE NOT NULL,
        commission_rate REAL DEFAULT 10.0,
        total_earnings REAL DEFAULT 0.0,
        total_referrals INTEGER DEFAULT 0,
        active_referrals INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_activity_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        bank_name TEXT,
        account_number TEXT,
        account_name TEXT
      )
    `);

    // Affiliate Referrals table
    db.run(`
      CREATE TABLE IF NOT EXISTS affiliate_referrals (
        id TEXT PRIMARY KEY,
        affiliate_id TEXT NOT NULL,
        referred_user_id TEXT NOT NULL,
        referred_user_email TEXT NOT NULL,
        referred_user_name TEXT NOT NULL,
        course_id TEXT NOT NULL,
        course_title TEXT NOT NULL,
        course_price REAL NOT NULL,
        commission_amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        completed_at DATETIME,
        payment_status TEXT DEFAULT 'pending',
        paid_at DATETIME,
        FOREIGN KEY (affiliate_id) REFERENCES affiliates (id)
      )
    `);

    // Admin users table
    db.run(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Affiliate credentials table
    db.run(`
      CREATE TABLE IF NOT EXISTS affiliate_credentials (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create admin user if not exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@nbta.com.ng';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    db.get('SELECT * FROM admin_users WHERE email = ?', [adminEmail], (err, row) => {
      if (err) {
        console.error('Error checking admin user:', err);
        return;
      }

      if (!row) {
        bcrypt.hash(adminPassword, 10, (err, hash) => {
          if (err) {
            console.error('Error hashing admin password:', err);
            return;
          }

          const adminId = uuidv4();
          db.run(
            'INSERT INTO admin_users (id, email, password_hash) VALUES (?, ?, ?)',
            [adminId, adminEmail, hash],
            (err) => {
              if (err) {
                console.error('Error creating admin user:', err);
              } else {
                console.log('✅ Admin user created successfully');
                console.log(`📧 Email: ${adminEmail}`);
                console.log(`🔑 Password: ${adminPassword}`);
              }
            }
          );
        });
      } else {
        console.log('✅ Admin user already exists');
      }
    });

    console.log('✅ Database initialized successfully');
  });
}

// Helper function to run queries with promises
export function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
}

// Helper function to get single row
export function getQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Helper function to get multiple rows
export function allQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
