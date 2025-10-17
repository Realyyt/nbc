import { Pool } from 'pg';

export async function pgInitializeDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Users
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Admin users
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Affiliate applications
    await client.query(`
      CREATE TABLE IF NOT EXISTS affiliate_applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        website VARCHAR(255),
        social_media_handles TEXT,
        audience_size INTEGER,
        audience_description TEXT,
        motivation TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Affiliates
    await client.query(`
      CREATE TABLE IF NOT EXISTS affiliates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        social_media_handles TEXT,
        audience_size INTEGER,
        audience_description TEXT,
        motivation TEXT,
        affiliate_code VARCHAR(50) UNIQUE NOT NULL,
        commission_rate NUMERIC(5,2) DEFAULT 0.10,
        status VARCHAR(50) NOT NULL DEFAULT 'approved',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Affiliate credentials
    await client.query(`
      CREATE TABLE IF NOT EXISTS affiliate_credentials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        affiliate_id UUID UNIQUE NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Affiliate referrals
    await client.query(`
      CREATE TABLE IF NOT EXISTS affiliate_referrals (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        affiliate_id UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
        referred_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        commission_amount NUMERIC(10,2) DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(affiliate_id, referred_user_id)
      )
    `);

    // Affiliate programs
    await client.query(`
      CREATE TABLE IF NOT EXISTS affiliate_programs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        platform VARCHAR(50),
        image_url TEXT,
        affiliate_link TEXT NOT NULL,
        price NUMERIC,
        rating NUMERIC,
        instructor VARCHAR(255),
        mode VARCHAR(20) DEFAULT 'online',
        price_type VARCHAR(20) DEFAULT 'paid',
        is_published BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Seed default admin if missing (email/password fields per pg routes expect 'password')
    const admin = await client.query('SELECT id FROM admin_users WHERE email=$1', ['admin@nbta.com.ng']);
    if (admin.rows.length === 0) {
      // Store a bcrypt hash into the 'password' column to match route usage
      const bcrypt = await import('bcryptjs');
      const hash = await bcrypt.default.hash('admin123', 12);
      await client.query(
        'INSERT INTO admin_users (email, password, role) VALUES ($1, $2, $3)',
        ['admin@nbta.com.ng', hash, 'admin']
      );
    }

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
    await pool.end();
  }
}


