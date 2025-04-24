import todoService from '../services/todoService.js';

class TodoController {
  async getTodos(req, res) {
    try {
      const todos = await todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async createTodo(req, res) {
    try {
      const { text } = req.body;
      const newTodo = await todoService.createTodo(text);
      res.json(newTodo);
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async toggleTodo(req, res) {
    try {
      const id = parseInt(req.params.id);
      const updatedTodo = await todoService.toggleTodo(id);
      res.json(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTodo(req, res) {
    try {
      const id = parseInt(req.params.id);
      const result = await todoService.deleteTodo(id);
      res.json(result);
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ message: error.message });
    }
  }
}

export default new TodoController();