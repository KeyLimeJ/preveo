// seed/migrate.js
// Run with: node seed/migrate.js
// Requires DATABASE_URL in environment

import { neon } from '@neondatabase/serverless';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL not set. Check your .env file.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log('Running Preveo database migration...\n');

  await sql`CREATE TABLE IF NOT EXISTS users (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid TEXT UNIQUE NOT NULL,
    email        TEXT NOT NULL,
    name         TEXT,
    created_at   TIMESTAMPTZ DEFAULT NOW()
  )`;
  console.log('✓ users table');

  await sql`CREATE TABLE IF NOT EXISTS programs (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id        UUID REFERENCES users(id) ON DELETE CASCADE,
    title          TEXT NOT NULL,
    description    TEXT,
    duration_weeks INT DEFAULT 13,
    created_at     TIMESTAMPTZ DEFAULT NOW()
  )`;
  console.log('✓ programs table');

  await sql`CREATE TABLE IF NOT EXISTS plans (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id  UUID REFERENCES programs(id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    week_number INT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
  )`;
  console.log('✓ plans table');

  await sql`CREATE TABLE IF NOT EXISTS days (
    id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
    date    DATE NOT NULL,
    notes   TEXT
  )`;
  console.log('✓ days table');

  await sql`CREATE TABLE IF NOT EXISTS events (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_id       UUID REFERENCES days(id) ON DELETE CASCADE,
    type         TEXT CHECK (type IN ('nutrition','training','recovery','other')),
    title        TEXT NOT NULL,
    data         JSONB DEFAULT '{}',
    scheduled_at TIMESTAMPTZ
  )`;
  console.log('✓ events table');

  await sql`CREATE TABLE IF NOT EXISTS conversations (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
    title      TEXT NOT NULL DEFAULT 'New conversation',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`;
  console.log('✓ conversations table');

  await sql`CREATE TABLE IF NOT EXISTS messages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    role            TEXT CHECK (role IN ('user','assistant')) NOT NULL,
    content         TEXT NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW()
  )`;
  console.log('✓ messages table');

  console.log('\nMigration complete.');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});