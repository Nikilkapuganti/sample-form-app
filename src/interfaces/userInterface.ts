import mongoose from "mongoose";

export interface User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
  }
  
  export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
  }

export const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});
export const User = mongoose.model('User', userSchema);

  
  