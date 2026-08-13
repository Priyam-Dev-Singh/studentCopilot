import express from 'express';
import cors from 'cors';

// Prisma 7 specific imports targeting the /client directory
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const app = express();
const PORT = process.env.PORT || 5000;

// Prisma 7 requires the driver adapter to connect to the database
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Middleware
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/', (req, res) => {
  res.json({ message: "Student OS Backend is live!" });
});

// Database Health Check
app.get('/db-status', async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ message: "Database connection successful! The containers are talking." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});