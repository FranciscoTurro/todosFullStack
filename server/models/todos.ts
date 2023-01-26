import { Schema, model, Types } from 'mongoose';

export interface ITodo {
  name: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  list: Types.ObjectId;
}

const todoSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  dueDate: { type: Date, required: false },
  completed: { type: Boolean, required: true, default: false },
  list: { type: Types.ObjectId, ref: 'Lists', required: true },
});

export const TodoModel = model<ITodo>('Todos', todoSchema);
