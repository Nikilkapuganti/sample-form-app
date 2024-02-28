
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../../interfaces/userInterface'

const users: User[] = [];

const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, '1233433', { expiresIn: '1h' });
};

export const register = async (body:any): Promise<void> => {
  const { username, password } = body

  // Check if the username is already taken
  if (users.some((user) => user.username === username)) {
    console.log("sdfgh")
    //res.status(400).json({ error: 'Username is already taken' });
    // 'sdfghj';
  }

 
  

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: uuidv4(),
    username,
    password: hashedPassword,
    role: UserRole.USER,
  };

  users.push(newUser);
  const token = generateToken(newUser);

  console.log("sdds",token)

  //res.status(201).json({ token });
};

export const login = async (body:any): Promise<void> => {
  const { username, password } =body;

  const user:any = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    // res.status(401).json({ error: 'Invalid credentials' });
    // return;
  }

  const token = generateToken(user);

  // res.json({ token });
};
