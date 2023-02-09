import { Schema, model, Types, Document } from 'mongoose';

export interface IList extends Document {
  name: string;
  todos: Array<Types.ObjectId>;
  creator: Types.ObjectId | string;
}

const listSchema = new Schema({
  name: { type: String, required: true },
  todos: [{ type: Types.ObjectId, ref: 'Todos' }],
  creator: { type: Types.ObjectId, ref: 'Users' },
});

export const ListModel = model<IList>('Lists', listSchema);
