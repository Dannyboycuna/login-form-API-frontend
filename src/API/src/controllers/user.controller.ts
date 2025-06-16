import { Request, Response } from 'express';
import { User, UserModel } from '../models/user.model.ts';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'default_secret';

export const verifyToken = (req: Request, res: Response, next: Function) => {
  const token = req.headers['x-access-token'] as string;
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  jwt.verify(token, SECRET, (error: any, decoded: any) => {
    if (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    (req as any).id = decoded.id;
    next();
    next()
  })
}


export const getAll = async (_req: Request, res: Response, _verifyToken: any) => {
  UserModel.find({}).select('_id username email')
    .then((users: any) => {
      res.status(200).json(users)
    })
    .catch((error: { message: any; }) => {
      res.status(500).json({ message: error.message })
    })
};

export const getOne = async (req: Request, res: Response) => {


  try {
    const oneUser = await UserModel.findById(req.params.id).select('email');
    res.status(200).json(oneUser)

    if (!oneUser) {
      res.status(404).json('User not found!')
    }
  }
  catch (error) {
    res.status(500).json({ message: (error instanceof Error) ? error.message : 'Error message' })
  }
};

export const loginUser =async (_req: Request, res: Response) => {

  try {
    const token = jwt.sign({
      id: _req.body._id, username: _req.body.username
    }, process.env.JWT_SECRECT || 'default_secret',
      { expiresIn: '10s' });
    res.status(200).json({
      message: 'Login succesfull',
      token,
      UserModel:{id:_req.body._id, username:_req.body.username}
    })
  }
  catch (error) {
    res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' })
  }
};


export const create = async (_req: Request, _res: Response) => {
  const { username, password, email } = _req.body;
  try {
    const existOneUserName =await UserModel.findOne({ username });
    const existOneEmail =await UserModel.findOne({ email });
    if (existOneEmail) {
     return _res.status(400).json({message: 'Email aalready exists.'})
    }else if (existOneUserName) {
      return _res.status(400).json({message: 'Username already exists.'})
    }
    else if (existOneEmail && existOneUserName) {
      return _res.status(400).json({message: 'Username and email registered.'})
    }
    else {
      const newUser = new UserModel(_req.body);
      const savedUser = newUser.save()
      _res.status(201).json(_req.body)
      return _res.json({ message: 'Registered successfully' })
      
    }
    
  }
  catch (error) {
    _res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' })
  }
}

export const update = async(req: Request, res: Response) => {

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json('user not found!');
    }
    res.json(updatedUser)
  }
  catch (error) {
    return res.status(500).json('An unknown error occurred')
  }
};

export const remove = async (req: Request, res: Response) => {


  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json('user not found')
    }
    return res.json(deletedUser);

  }
  catch (error) {
    res.status(500).json({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' })
  }

};


export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  loginUser
};

