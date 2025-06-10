import express from 'express';
const router = express.Router();


// User Middlewares and Controllers:-
import { validateUserInfo, validateUserLoginInfo, isAuthenticated } from '../../middlewares/UserMiddleware.js';
import { signin, login } from '../../controllers/UserController.js';

// User Routes:-
router.post('/signup', validateUserInfo, signin);
router.post('/login', validateUserLoginInfo, login);


// Blog Middlewares and Controllers:-
import { validateBlogInfo } from '../../middlewares/BlogMiddleware.js';
import singleImageUploader from '../../middlewares/MulterMiddleware.js';
import { createBlog, deleteBlog, getBlogById, getAllPublishedBlogs, toggleBlogPublishStatus } from '../../controllers/BlogController.js';

// Blog Routes:-
router.post('/blog/create', isAuthenticated, singleImageUploader, validateBlogInfo, createBlog);
router.delete('/blog/delete/:id', isAuthenticated, deleteBlog);
router.get('/blog/:id', getBlogById);
router.get('/blogs', getAllPublishedBlogs);
router.patch('/blog/:id', isAuthenticated, toggleBlogPublishStatus);


// Comment Middlewares and Controllers:-
import { validateCommentInfo } from '../../middlewares/CommentMiddleware.js'
import { createComment, getBlogComments, deleteComment, approveComment } from '../../controllers/CommentController.js'

// Comment Routes:-
router.post('/comment/create', validateCommentInfo, isAuthenticated, createComment);
router.get('/blog/:blogId/comments', getBlogComments);
router.delete('/comment/:commentId', isAuthenticated, deleteComment);
router.patch('/comment/:commentId/approve', isAuthenticated, approveComment);


export default router;