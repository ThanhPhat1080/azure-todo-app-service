import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const todoCount = await prisma.todo.count();

  if (todoCount === 0) {
    const seedData = [
      {
        text: 'Learn Prisma with Azure SQL',
        completed: false,
      },
      {
        text: 'Build REST API with Express',
        completed: true,
      },
      {
        text: 'Deploy to Azure Cloud',
        completed: false,
      }
    ];

    console.log('Seeding database...');

    for (const todo of seedData) {
      await prisma.todo.create({
        data: todo,
      });
    }

    console.log('Seeding completed!');
  } else {
    console.log('Database already has data, skipping seed.');
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });