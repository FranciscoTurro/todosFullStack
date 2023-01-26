import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/Users';
import { Types } from 'mongoose';

export interface RequestWithUser extends Request {
  user: Types.ObjectId;
}

export const requireAuth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(401).send({ error: 'Authorization token necessary' });

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;

    const user = await UserModel.findOne({ _id: id }).select('_id');
    if (!user) return res.status(404).json({ error: 'User not found' });
    req.user = user._id;

    next();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
