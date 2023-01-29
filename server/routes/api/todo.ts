import express from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { todoController } from '../../controllers/todo';

export const todoRouter = express.Router();

todoRouter.use(requireAuth);

todoRouter.post('/:listID', todoController.createTodo);

todoRouter.delete('/:todoID', todoController.deleteTodo);
