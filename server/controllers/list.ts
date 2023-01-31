import { ListModel } from '../models/lists';
import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { UserModel } from '../models/Users';

export const listController = {
  createList: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const list = await ListModel.create({
        name: name,
        creator: req.user,
      });

      const user = await UserModel.findById(req.user);
      user.lists.push(list._id);
      await user.save();

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

      const user = await UserModel.findById(req.user);

      const deletedList = await ListModel.findByIdAndDelete(id);

      const listIndex = user.lists.indexOf(new Types.ObjectId(id));
      if (listIndex > -1) user.lists.splice(listIndex, 1);
      await user.save();

      res.status(200).json(deletedList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getLists: async (req: Request, res: Response) => {
    try {
      const lists = await ListModel.find({ creator: req.user });
      if (!lists) throw Error('Current user has no lists created');

      res.status(200).json(lists);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getOneList: async (req: Request, res: Response) => {
    try {
      const { listID } = req.params;
      const list = await ListModel.findById(listID).populate('todos');

      if (JSON.stringify(list.creator) !== JSON.stringify(req.user))
        throw Error('List was not created by current user');

      res.status(200).json(list);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  changeListName: async (req: Request, res: Response) => {
    try {
      const { listID } = req.params;
      const list = await ListModel.findById(listID);

      if (JSON.stringify(list.creator) !== JSON.stringify(req.user))
        throw Error('List was not created by current user');

      const { name } = req.body;
      list.name = name;
      await list.save();

      res.status(200).json(list);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
