const { PrismaClient } = require('@prisma/client');
const TodoRepository = require('../todoRepository');

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        todo: {
          findMany: jest.fn(),
          create: jest.fn(),
          findUnique: jest.fn(),
          delete: jest.fn(),
          update: jest.fn(),
        },
      };
    }),
  };
});

describe('TodoRepository', () => {
  let prisma;
  let todoRepository;

  beforeEach(() => {
    prisma = new PrismaClient();
    todoRepository = new TodoRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all todos ordered by createdAt desc', async () => {
      const mockTodos = [
        { id: 1, text: 'Todo 1', completed: false },
        { id: 2, text: 'Todo 2', completed: true },
      ];

      prisma.todo.findMany.mockResolvedValue(mockTodos);

      const result = await todoRepository.findAll();

      expect(prisma.todo.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' }
      });
      expect(result).toEqual(mockTodos);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const todoData = { text: 'New Todo', completed: false };
      const mockTodo = { id: 1, ...todoData };

      prisma.todo.create.mockResolvedValue(mockTodo);

      const result = await todoRepository.create(todoData);

      expect(prisma.todo.create).toHaveBeenCalledWith({
        data: todoData
      });
      expect(result).toEqual(mockTodo);
    });
  });

  describe('findById', () => {
    it('should find todo by id', async () => {
      const mockTodo = { id: 1, text: 'Todo 1', completed: false };

      prisma.todo.findUnique.mockResolvedValue(mockTodo);

      const result = await todoRepository.findById(1);

      expect(prisma.todo.findUnique).toHaveBeenCalledWith({
        where: { id: 1 }
      });
      expect(result).toEqual(mockTodo);
    });
  });

  describe('delete', () => {
    it('should delete todo by id', async () => {
      const mockTodo = { id: 1, text: 'Todo 1', completed: false };

      prisma.todo.delete.mockResolvedValue(mockTodo);

      const result = await todoRepository.delete(1);

      expect(prisma.todo.delete).toHaveBeenCalledWith({
        where: { id: 1 }
      });
      expect(result).toEqual(mockTodo);
    });
  });

  describe('update', () => {
    it('should update todo', async () => {
      const updateData = { completed: true };
      const mockTodo = { id: 1, text: 'Todo 1', ...updateData };

      prisma.todo.update.mockResolvedValue(mockTodo);

      const result = await todoRepository.update(1, updateData);

      expect(prisma.todo.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData
      });
      expect(result).toEqual(mockTodo);
    });
  });
});