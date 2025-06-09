import { verifyToken } from '../utils/passwordUtils.js';

export const validateUserInfo = (req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some credentials are missing'
        });
    }

    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some credentials are missing'
        });
    }
    next();
}

export const validateUserLoginInfo = (req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some credentials are missing'
        });
    }

    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some credentials are missing'
        });
    }
    next();
}

export const isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if(!token) {
        return res.status(401).json({
            data: {},
            success: false,
            message: 'Unauthorized Access',
            error: 'No token provided'
        });
    }

    try {
        const response = verifyToken(token);
        if(!response) {
            return res.status(401).json({
                data: {},
                success: false,
                message: 'Unauthorized Access',
                error: 'Invalid token'
            });
        }
        req.user = response;
    } catch (error) {
        return res.status(401).json({
            data: {},
            success: false,
            message: 'Unauthorized Access',
            error: 'Invalid token'
        });
    }
    next();
}