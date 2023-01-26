import { Schema, model, Types } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  lists: Array<Types.ObjectId>;
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lists: [{ type: Types.ObjectId, ref: 'Lists' }],
});

export const UserModel = model<IUser>('Users', userSchema);
