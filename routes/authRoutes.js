// routes/authRoutes.js
import express from 'express';
import {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/signup', getSignup);
router.post('/signup', postSignup);

export default router;
