import { Schema, model, Types } from 'mongoose';

export interface ITodo {
  name: string;
  description: string;
  dueDate: Date;
  completed: boolean;
}

const todoSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  dueDate: { type: Date, required: false },
  completed: { type: Boolean, required: true },
});

export const TodoModel = model<ITodo>('Todo', todoSchema);
