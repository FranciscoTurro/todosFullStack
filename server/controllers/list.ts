import { ListModel } from '../models/lists';
import { Request, Response } from 'express';

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
};
