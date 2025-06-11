import UserService from "../services/UserService.js";
const userService = new UserService();

export const signin = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json({
            data: user,
            success: true,
            message: 'User created successfully',
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const user = await userService.signin(req.body);
        return res.status(200).json({
            data: user,
            success: true,
            message: 'User logged in successfully',
            error: null
        });
    } catch (error) {
        if(error.isOperational) {
            return res.status(error.statusCode).json({
                data: {},
                success: false,
                message: error.message,
                error: error.message
            });
        }
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export const getUserDashboardData = async (req, res) => {
    try {
        const userId = req.user.userId;
        const dashboardData = await userService.getUserDashboardData(userId);
        return res.status(200).json({
            data: dashboardData,
            success: true,
            message: "Dashboard data fetched successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            success: false,
            message: "Failed to fetch dashboard data",
            error: error.message
        });
    }
}