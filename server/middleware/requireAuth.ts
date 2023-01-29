import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/Users';

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw Error('Authorization token necessary');

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;

    const user = await UserModel.findOne({ _id: id }).select('_id');
    if (!user) throw Error('User not found');

    req.user = user._id;

    next();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
