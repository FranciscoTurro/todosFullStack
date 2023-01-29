import { ListModel } from '../models/lists';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const listController = {
  createList: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const list = await ListModel.create({
        name: name,
        creator: req.user,
      });
      res.status(200).json(list);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteList: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) throw Error('Invalid list ID');

      const list = await ListModel.findById(id);

      if (JSON.stringify(list.creator) !== JSON.stringify(req.user))
        throw Error('List was not created by current user');

      const deletedList = await ListModel.findByIdAndDelete(id);

      res.status(200).json(deletedList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getLists: async (req: Request, res: Response) => {
    //TODO, get all the lists in a user
  },
};
