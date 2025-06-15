import express from 'express';
import { getAll, getOne, create, update, remove, loginUser } from '../controllers/user.controller.ts';
import hashPassword from '../middleware/hashPassword.ts';
import { validateLogin } from '../middleware/validateLogin.ts';


const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/',hashPassword, create);
router.put('/:id', update);
router.delete('/:id', remove);
router.post('/login', validateLogin, loginUser)

export default router;
