// routes/authRoutes.js
import express from 'express';
import {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  Logout,
  googleAuth,
  googleRedirect,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/logout', Logout);

//OAuth routes
router.get('/google', googleAuth);

router.get('/google/redirect', googleRedirect); 
export default router;
