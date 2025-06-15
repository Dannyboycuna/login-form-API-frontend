import bcrypt from 'bcrypt';
import { Request, Response, NextFunction, response } from 'express';

const hashPassword = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  if (req.body && req.body.password) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    } catch (error) {
      _.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
  }
  next();
};

export default hashPassword;