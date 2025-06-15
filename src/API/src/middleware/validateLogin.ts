import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model.ts";
import bcrypt from 'bcrypt';

export const validateLogin = async (req: Request & { UserModel?: typeof UserModel }, res: Response, next: NextFunction) => {
  const { username, password, email } = req.body as { username: string; password: string; email?: string };
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    req.body = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

export default  validateLogin;