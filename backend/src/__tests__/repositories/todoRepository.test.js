import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { TodoRepository } from '../../repositories/todoRepository';


// Mock PrismaClient constructor
vi.mock('@prisma/client', () => ({
    PrismaClient: vi.fn(() => ({
        todo: {
            findMany: vi.fn(),
            create: vi.fn(),
            findUnique: vi.fn(),
            delete: vi.fn(),
            update: vi.fn(),
        }
    })),
}));

describe('TodoRepository', () => {
    let todoRepository;
    let mockPrismaClient;

    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();

        mockPrismaClient = new PrismaClient();
        todoRepository = new TodoRepository(mockPrismaClient);
    });

    it('should find all todos', async () => {
        const mockTodos = [{ id: 1, text: 'Test todo', completed: false }];
        mockPrismaClient.todo.findMany.mockResolvedValue(mockTodos);

        const result = await todoRepository.findAll();
        expect(result).toEqual(mockTodos);
        expect(mockPrismaClient.todo.findMany).toHaveBeenCalledTimes(1);
    });

    it('should create a todo', async () => {
        const todoData = { text: 'New todo', completed: false };
        const mockTodo = { id: 1, ...todoData };
        mockPrismaClient.todo.create.mockResolvedValue(mockTodo);

        const result = await todoRepository.create(todoData);
        expect(result).toEqual(mockTodo);
        expect(mockPrismaClient.todo.create).toHaveBeenCalledWith({ data: todoData });
    });
});
