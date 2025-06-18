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

const router = express.Router();

router.get('/', getHome);
router.get('/create', getCreate);
router.post('/create', postCreate);
router.get('/post', getPost);
router.get('/404', get404);
router.get('/posts/:id', getSinglePost);
router.get('/blog/:id/edit', getEditPost);
router.put('/blog/:id', updatePost);
router.delete('/blog/:id', deletePost);

export default router;
