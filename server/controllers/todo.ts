import { TodoModel } from '../models/todos';
import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { ListModel } from '../models/lists';

export const todoController = {
  createTodo: async (req: Request, res: Response) => {
    try {
      const { listID } = req.params;
      if (!mongoose.Types.ObjectId.isValid(listID))
        throw Error('Invalid list ID');

      const list = await ListModel.findById(listID);

      if (JSON.stringify(list.creator) !== JSON.stringify(req.user))
        throw Error('List was not created by current user');

      const { name, description, dueDate, completed } = req.body;

      const todo = await TodoModel.create({
        name,
        description,
        dueDate,
        completed,
        list: new Types.ObjectId(listID),
      });

      list.todos.push(todo._id);
      await list.save();

      res.status(200).json(todo);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteTodo: async (req: Request, res: Response) => {
    try {
      const { todoID } = req.params;
      if (!mongoose.Types.ObjectId.isValid(todoID))
        throw Error('Invalid todo ID');

      const todo = await TodoModel.findById(new Types.ObjectId(todoID));

      const list = await ListModel.findById(todo.list);
      if (JSON.stringify(list.creator) !== JSON.stringify(req.user))
        throw Error('Todo was not created by current user');

      const todoIndex = list.todos.indexOf(todo._id);
      if (todoIndex > -1) list.todos.splice(todoIndex, 1);
      await list.save();

      const deletedTodo = await TodoModel.findByIdAndDelete(todoID);

      res.status(200).json(deletedTodo);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  getTodos: async (req: Request, res: Response) => {
    try {
      const { listID } = req.params;
      if (!mongoose.Types.ObjectId.isValid(listID))
        throw Error('Invalid list ID');

      const list = await ListModel.findById(listID).populate('todos');

      if (JSON.stringify(list.creator) !== JSON.stringify(req.user))
        throw Error('List was not created by current user');

      res.status(200).json(list.todos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  getOneTodo: async (req: Request, res: Response) => {
    try {
      const { todoID } = req.params;
      if (!mongoose.Types.ObjectId.isValid(todoID))
        throw Error('Invalid todo ID');

      const todo = await TodoModel.findById(new Types.ObjectId(todoID));

      const list = await ListModel.findById(todo.list);
      if (JSON.stringify(list.creator) !== JSON.stringify(req.user))
        throw Error('Todo was not created by current user');

      res.status(200).json(todo);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  editTodo: async (req: Request, res: Response) => {
    try {
      const { todoID } = req.params;
      if (!mongoose.Types.ObjectId.isValid(todoID))
        throw Error('Invalid todo ID');

      const todo = await TodoModel.findById(new Types.ObjectId(todoID));

      const list = await ListModel.findById(todo.list);
      if (JSON.stringify(list.creator) !== JSON.stringify(req.user))
        throw Error('Todo was not created by current user');

      await todo.updateOne({ ...req.body });

      res.status(200).json('Ok');
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
