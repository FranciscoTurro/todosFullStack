import { Schema, model, Types } from 'mongoose';

export interface IList {
  name: string;
  todos: Types.ObjectId;
}

const listSchema = new Schema({
  username: { type: String, required: true, unique: true },
  todos: [{ type: Types.ObjectId, ref: 'Todo' }],
});

export const ListModel = model<IList>('User', listSchema);
