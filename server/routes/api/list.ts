import express from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { listController } from '../../controllers/list';

export const listRouter = express.Router();

listRouter.use(requireAuth);

listRouter.post('/', listController.createList);

listRouter.delete('/:id', listController.deleteList);
