import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import todoRouter from './src/router/todoRouter.js';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Mount the todo router
app.use('/api/todos', todoRouter);

app.listen(5000, () => console.log("Server running on port 5000"));

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
