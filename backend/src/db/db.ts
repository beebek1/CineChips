// src/db.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// 1. Create a connection pool using your .env variable
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Set up the adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the Prisma Client
const prisma = new PrismaClient({ adapter });

export default prisma;