import express from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { RequestWithUser } from '../../middleware/requireAuth';
import { Request, Response, NextFunction } from 'express';
import { listController } from '../../controllers/list';

export const listRouter = express.Router();

listRouter.use((req: Request, res: Response, next: NextFunction) => {
  requireAuth(req as RequestWithUser, res, next);
});

listRouter.post('/create', listController.createList);
