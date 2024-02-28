// taskModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  description: string;
  dueDate: Date;
  assignee: string;
}

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  assignee: { type: String, required: true },
});

export const TaskModel = mongoose.model<Task>('Task', taskSchema);
