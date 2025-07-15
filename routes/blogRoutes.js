// routes/blogRoutes.js
import express from 'express';
import {
  getHome,
  getCreate,
  postCreate,
  getPost,
  get404,
  getSinglePost,
  getEditPost,
  updatePost,
  deletePost
} from '../controllers/blogController.js';
import {requireAuth} from '../middleware/authMiddleware.js'

const router = express.Router();
router.get('/', getHome);
router.get('/create', requireAuth, getCreate);
router.post('/create', requireAuth, postCreate);
router.get('/post', getPost);
router.get('/404', get404);
router.get('/posts/:id', getSinglePost);
router.get('/blog/:id/edit', requireAuth, getEditPost);
router.put('/blog/:id', requireAuth,  updatePost);
router.delete('/blog/:id', requireAuth, deletePost);

export default router;
