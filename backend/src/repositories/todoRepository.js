import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TodoRepository {
  async findAll() {
    return await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(data) {
    return await prisma.todo.create({ data });
  }

  async findById(id) {
    return await prisma.todo.findUnique({
      where: { id }
    });
  }

  async delete(id) {
    return await prisma.todo.delete({
      where: { id }
    });
  }

  async update(id, data) {
    return await prisma.todo.update({
      where: { id },
      data
    });
  }
}

export default new TodoRepository();