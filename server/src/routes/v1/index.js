import express from 'express';
const router = express.Router();


// User Middlewares and Controllers:-
import { validateUserInfo, validateUserLoginInfo, isAuthenticated } from '../../middlewares/UserMiddleware.js';
import { signin, login } from '../../controllers/UserController.js';


// Blog Middlewares and Controllers:-
import { validateBlogInfo } from '../../middlewares/BlogMiddleware.js';
import { createBlog, deleteBlog, getBlogById, getAllPublishedBlogs, toggleBlogPublishStatus } from '../../controllers/BlogController.js';


// Comment Middlewares and Controllers:-
import { validateCommentInfo } from '../../middlewares/CommentMiddleware.js'
import { createComment, getBlogComments } from '../../controllers/CommentController.js'


// User Routes:-
router.post('/signup', validateUserInfo, signin);
router.post('/login', validateUserLoginInfo, login);


// Blog Routes:-
router.post('/blog/create', validateBlogInfo, isAuthenticated, createBlog);
router.delete('/blog/delete/:id', isAuthenticated, deleteBlog);
router.get('/blog/:id', getBlogById);
router.get('/blogs', getAllPublishedBlogs);
router.patch('/blog/:id', isAuthenticated, toggleBlogPublishStatus);


// Comment Routes:-
router.post('/comment/create', validateCommentInfo, isAuthenticated, createComment);
router.get('/blog/:blogId/comments', getBlogComments);

export default router;