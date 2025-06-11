import express from 'express';
const router = express.Router();


// User Middlewares and Controllers:-
import { validateUserInfo, validateUserLoginInfo, isAuthenticated } from '../../middlewares/UserMiddleware.js';
import { signin, login, getUserDashboardData } from '../../controllers/UserController.js';


// User Routes:-
router.post('/user/signup', validateUserInfo, signin);
router.post('/user/login', validateUserLoginInfo, login);
router.get('/user/dashboard', isAuthenticated, getUserDashboardData);


// Blog Middlewares and Controllers:-
import { validateBlogInfo, validatePrompt } from '../../middlewares/BlogMiddleware.js';
import singleImageUploader from '../../middlewares/MulterMiddleware.js';
import { createBlog, deleteBlog, getBlogById, getAllBlogsOfUser,
    getAllPublishedBlogs, toggleBlogPublishStatus, generateBlogContent
} from '../../controllers/BlogController.js';


// Blog Routes:-
router.post('/blog/create', singleImageUploader, isAuthenticated, validateBlogInfo, createBlog);
router.patch('/blog/toggle-publish/:id', isAuthenticated, toggleBlogPublishStatus);
router.delete('/blog/delete/:id', isAuthenticated, deleteBlog);
router.get('/blog/:id', getBlogById);
router.post('/blog/gemini/generate', validatePrompt, isAuthenticated, generateBlogContent);
router.get('/user/blogs', isAuthenticated, getAllBlogsOfUser);
router.get('/blogs', getAllPublishedBlogs);


// Comment Middlewares and Controllers:-
import { validateCommentInfo } from '../../middlewares/CommentMiddleware.js'
import { createComment, getBlogComments, deleteComment, approveComment,
    getAllCommentsForUserBlogs } from '../../controllers/CommentController.js'


// Comment Routes:-
router.post('/comment/create', validateCommentInfo, isAuthenticated, createComment);
router.get('/blog/:blogId/comments', getBlogComments);
router.delete('/comment/:commentId', isAuthenticated, deleteComment);
router.patch('/comment/:commentId/approve', isAuthenticated, approveComment);
router.get('/user/comments', isAuthenticated, getAllCommentsForUserBlogs);


export default router;