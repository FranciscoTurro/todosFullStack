import { UserModel } from '../models/Users';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const createJWT = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.SECRET!, { expiresIn: '3d' });
};

export const userController = {
  signupUser: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      console.log(req.body);

      if (!username || !password) {
        throw Error('All fields must be complete');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const user = await UserModel.create({
        username: username,
        password: hashedPass,
      });

      const token = createJWT(user._id);

      res.status(200).send({ user, token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
