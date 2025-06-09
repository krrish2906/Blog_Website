export const validateUserInfo = (req, res, next) => {
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
