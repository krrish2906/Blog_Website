import express from 'express';
const router = express.Router();

// User Middlewares and Controllers:-
import { validateUserInfo, validateUserLoginInfo } from '../../middlewares/UserMiddlewares.js';
import { signin, login } from '../../controllers/UserControllers.js';


// User Routes:-
router.post('/signup', validateUserInfo, signin);
router.post('/login', validateUserLoginInfo, login);


export default router;