import express from 'express';
import todoController from '../controllers/todoController.js';

const router = express.Router();

// Get all todos
router.get('/', todoController.getTodos);

// Create a new todo
router.post('/', todoController.createTodo);

// Toggle todo completion status
router.put('/:id/toggle', todoController.toggleTodo);

// Delete a todo
router.delete('/:id', todoController.deleteTodo);

export default router;