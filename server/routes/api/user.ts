import express from 'express';
import { userController } from '../../controllers/user';

export const userRouter = express.Router();

userRouter.post('/signup', userController.signupUser);

userRouter.post('/login', userController.loginUser);
