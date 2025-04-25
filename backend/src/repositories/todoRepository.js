import { PrismaClient } from '@prisma/client';

export class TodoRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findAll() {
    return await this.prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(data) {
    return await this.prisma.todo.create({ data });
  }

  async findById(id) {
    return await this.prisma.todo.findUnique({
      where: { id }
    });
  }

  async delete(id) {
    return await this.prisma.todo.delete({
      where: { id }
    });
  }

  async update(id, data) {
    return await this.prisma.todo.update({
      where: { id },
      data
    });
  }
}

const prisma = new PrismaClient();
export default new TodoRepository(prisma);