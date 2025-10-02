import sqlite3pkg from 'sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

const sqlite3 = sqlite3pkg.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path - use persistent storage for production environments
const dbPath = process.env.NODE_ENV === 'production' 
  ? path.join(process.env.HOME || '/tmp', 'affiliate_system.db')
  : path.join(__dirname, '../../affiliate_system.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    console.error('Database path:', dbPath);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Helper functions for database operations
export const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
};

export const getQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export const allQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Initialize database with production-ready schema
export async function initializeDatabase() {
  try {
    // Enable foreign keys
    await runQuery('PRAGMA foreign_keys = ON');
    
    // Create affiliate_applications table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS affiliate_applications (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        website TEXT,
        social_media_handles TEXT,
        audience_size INTEGER,
        audience_description TEXT,
        motivation TEXT,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        reviewed_at DATETIME,
        reviewed_by TEXT,
        rejection_reason TEXT
      )
    `);

    // Create affiliates table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS affiliates (
        id TEXT PRIMARY KEY,
        application_id TEXT UNIQUE,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        social_media_handles TEXT,
        audience_size INTEGER,
        audience_description TEXT,
        affiliate_code TEXT UNIQUE NOT NULL,
        commission_rate REAL DEFAULT 0.10,
        total_earnings REAL DEFAULT 0.00,
        total_referrals INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'inactive')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (application_id) REFERENCES affiliate_applications (id) ON DELETE CASCADE
      )
    `);

    // Create affiliate_credentials table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS affiliate_credentials (
        id TEXT PRIMARY KEY,
        affiliate_id TEXT UNIQUE NOT NULL,
        user_id TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME,
        is_active BOOLEAN DEFAULT 1,
        FOREIGN KEY (affiliate_id) REFERENCES affiliates (id) ON DELETE CASCADE
      )
    `);

    // Create affiliate_referrals table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS affiliate_referrals (
        id TEXT PRIMARY KEY,
        affiliate_id TEXT NOT NULL,
        referred_user_id TEXT NOT NULL,
        referred_user_email TEXT NOT NULL,
        referred_user_name TEXT,
        commission_amount REAL DEFAULT 0.00,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        confirmed_at DATETIME,
        paid_at DATETIME,
        FOREIGN KEY (affiliate_id) REFERENCES affiliates (id) ON DELETE CASCADE
      )
    `);

    // Create admin_users table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
        is_active BOOLEAN DEFAULT 1,
        last_login DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create affiliate_payments table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS affiliate_payments (
        id TEXT PRIMARY KEY,
        affiliate_id TEXT NOT NULL,
        bank_name TEXT NOT NULL,
        account_number TEXT NOT NULL,
        account_name TEXT NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
        payment_date DATETIME,
        reference TEXT,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (affiliate_id) REFERENCES affiliates (id) ON DELETE CASCADE
      )
    `);

    // Create affiliate_programs table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS affiliate_programs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        platform TEXT,
        image_url TEXT,
        affiliate_link TEXT NOT NULL,
        price REAL,
        rating REAL,
        instructor TEXT,
        mode TEXT DEFAULT 'online',
        price_type TEXT DEFAULT 'paid',
        is_published INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create system_settings table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS system_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        description TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await runQuery('CREATE INDEX IF NOT EXISTS idx_affiliate_applications_email ON affiliate_applications(email)');
    await runQuery('CREATE INDEX IF NOT EXISTS idx_affiliate_applications_status ON affiliate_applications(status)');
    await runQuery('CREATE INDEX IF NOT EXISTS idx_affiliates_code ON affiliates(affiliate_code)');
    await runQuery('CREATE INDEX IF NOT EXISTS idx_affiliates_email ON affiliates(email)');
    await runQuery('CREATE INDEX IF NOT EXISTS idx_affiliate_referrals_affiliate_id ON affiliate_referrals(affiliate_id)');
    await runQuery('CREATE INDEX IF NOT EXISTS idx_affiliate_referrals_status ON affiliate_referrals(status)');
    await runQuery('CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email)');

    // Insert default admin user if not exists, or update password if exists
    const adminExists = await getQuery('SELECT id FROM admin_users WHERE email = ?', ['wecanhelp@nbta.institute']);
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('jChiegil!@$', 12);
      await runQuery(`
        INSERT INTO admin_users (id, email, password_hash, full_name, role)
        VALUES (?, ?, ?, ?, ?)
      `, [
        generateId(),
        'wecanhelp@nbta.institute',
        hashedPassword,
        'System Administrator',
        'super_admin'
      ]);
      console.log('✅ Default admin user created');
    } else {
      // Update existing admin password to new secure password
      const hashedPassword = await bcrypt.hash('jChiegil!@$', 12);
      await runQuery(`
        UPDATE admin_users 
        SET password_hash = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE email = ?
      `, [hashedPassword, 'wecanhelp@nbta.institute']);
      console.log('✅ Admin password updated to new secure password');
    }

    // Insert default system settings
    const settings = [
      ['default_commission_rate', '0.10', 'Default commission rate for affiliates'],
      ['min_commission_amount', '1000', 'Minimum commission amount before payment'],
      ['affiliate_code_length', '8', 'Length of affiliate codes'],
      ['max_affiliate_applications', '1000', 'Maximum number of affiliate applications'],
      ['system_version', '1.0.0', 'Current system version']
    ];

    for (const [key, value, description] of settings) {
      await runQuery(`
        INSERT OR IGNORE INTO system_settings (key, value, description)
        VALUES (?, ?, ?)
      `, [key, value, description]);
    }

    // Add sample affiliate applications to preserve data
    const sampleApplications = [
      {
        id: 'sample-app-1',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+2348012345678',
        website: 'https://johndoe.com',
        audienceSize: 5000,
        audienceDescription: 'Tech enthusiasts and developers',
        motivation: 'Want to help people learn programming',
        socialMediaHandles: JSON.stringify({ twitter: '@johndoe', instagram: '@johndoe_dev' })
      },
      {
        id: 'sample-app-2',
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+2348023456789',
        website: 'https://sarahjohnson.com',
        audienceSize: 3000,
        audienceDescription: 'Digital marketing professionals',
        motivation: 'Passionate about helping businesses grow',
        socialMediaHandles: JSON.stringify({ twitter: '@sarahjohnson', linkedin: 'sarah-johnson' })
      },
      {
        id: 'sample-app-3',
        fullName: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: '+2348034567890',
        website: 'https://michaelbrown.com',
        audienceSize: 8000,
        audienceDescription: 'Entrepreneurs and business owners',
        motivation: 'Love sharing knowledge and helping others succeed',
        socialMediaHandles: JSON.stringify({ twitter: '@michaelbrown', youtube: 'Michael Brown Business' })
      }
    ];

    for (const app of sampleApplications) {
      await runQuery(`
        INSERT OR IGNORE INTO affiliate_applications (
          id, full_name, email, phone, website, audience_size, 
          audience_description, motivation, social_media_handles, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        app.id, app.fullName, app.email, app.phone, app.website, app.audienceSize,
        app.audienceDescription, app.motivation, app.socialMediaHandles, 'pending'
      ]);
    }

    console.log('✅ Database schema initialized successfully');
    console.log('✅ Indexes created for optimal performance');
    console.log('✅ Default system settings configured');
    console.log('✅ Sample affiliate applications added');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// Generate unique ID
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Close database connection
export function closeDatabase() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Database connection closed');
        resolve();
      }
    });
  });
}

export { db };
