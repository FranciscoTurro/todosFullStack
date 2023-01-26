import { Router } from 'express';
import { listRouter } from './list';
import { userRouter } from './user';

export const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/lists', listRouter);
