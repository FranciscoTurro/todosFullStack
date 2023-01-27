import { UserModel } from '../models/Users';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { ListModel } from '../models/lists';

const createJWT = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.SECRET!, { expiresIn: '3d' });
};

export const userController = {
  signupUser: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const user = await UserModel.create({
        username: username,
        password: hashedPass,
      });

      await ListModel.create({
        name: 'General',
        creator: user._id,
      });

      const token = createJWT(user._id);

      res.status(200).send({ user, token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
  loginUser: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) throw Error('All fields must be complete');

      const user = await UserModel.findOne({ username });
      if (!user) throw Error('Invalid username');

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) throw Error('Invalid password');

      const token = createJWT(user._id);

      res.status(200).send({ user, token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
