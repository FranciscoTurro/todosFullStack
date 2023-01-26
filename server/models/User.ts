import { Schema, model, Types } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  lists: Types.ObjectId;
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lists: [{ type: Types.ObjectId, ref: 'List' }],
});

export const UserModel = model<IUser>('User', userSchema);
