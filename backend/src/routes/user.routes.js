import express from 'express';
import {
  loginUser,
  createUser,
  logoutUSer,
  profileUser,
} from '../controller/user.controller.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/profile', authenticate, profileUser);
router.post('/logout', logoutUSer);

export default router;
