// routes/authRoutes.js
import express from 'express';
import {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  Logout,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/logout', Logout);

export default router;
