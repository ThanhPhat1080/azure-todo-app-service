import todoRepository from '../repositories/todoRepository.js';

class TodoService {
  async getAllTodos() {
    return await todoRepository.findAll();
  }

  async createTodo(text) {
    return await todoRepository.create({
      text,
      completed: false
    });
  }

  async toggleTodo(id) {
    const todo = await todoRepository.findById(id);
    return await todoRepository.update(id, {
      completed: !todo.completed
    });
  }

  async deleteTodo(id) {
    await todoRepository.delete(id);
    return { success: true };
  }
}

export default new TodoService();