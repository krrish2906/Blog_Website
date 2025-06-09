import express from 'express';
const router = express.Router();


// User Middlewares and Controllers:-
import { validateUserInfo, validateUserLoginInfo, isAuthenticated } from '../../middlewares/UserMiddlewares.js';
import { signin, login } from '../../controllers/UserControllers.js';

// Blog Middlewares and Controllers:-
import { validateBlogInfo } from '../../middlewares/BlogMiddlewares.js';
import { createBlog, deleteBlog } from '../../controllers/BlogControllers.js';


// User Routes:-
router.post('/signup', validateUserInfo, signin);
router.post('/login', validateUserLoginInfo, login);

// Blog Routes:-
router.post('/blog/create', isAuthenticated, validateBlogInfo, createBlog);
router.delete('/blog/delete/:id', isAuthenticated, deleteBlog);

export default router;