import UserRepository from "../repository/UserRepository.js";
import BlogRepository from "../repository/BlogRepository.js";
import CommentRepository from "../repository/CommentRepository.js";
import { hashPassword, generateToken, comparePassword } from '../utils/passwordUtils.js';

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.blogRepository = new BlogRepository();
        this.commentRepository = new CommentRepository();
    }

    async createUser(data) {
        try {
            // Hash password
            const hashedPassword = await hashPassword(data.password);
            const userData = { ...data, password: hashedPassword }
            
            // Create user
            const user = await this.userRepository.create(userData);

            // Generate token
            const payload = {
                userId: user._id,
                username: user.username,
                email: user.email
            }
            const token = generateToken(payload);

            // Exclude password from response, add token
            const { password, ...userResponse } = user.toObject();
            userResponse.token = token;
            return userResponse;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async getUserById(userId) {
        try {
            const user = await this.userRepository.findById(userId);
            return user;
        } catch (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
    }

    async getAllUsers() {
        try {
            const users = await this.userRepository.findAll();
            return users;
        } catch (error) {
            throw new Error(`Error fetching all users: ${error.message}`);
        }
    }

    async signin(data) {
        try {
            // Find User
            const user = await this.userRepository.findByEmail(data.email);
            if (!user) {
                throw new Error('User not found');
            }

            // Verify password
            const isPasswordValid = await comparePassword(data.password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid Credentials');
            }

            // Generate token
            const payload = {
                userId: user._id,
                username: user.username,
                email: user.email
            }
            const token = generateToken(payload);

            // Exclude password from response, add token
            const { password, ...userResponse } = user.toObject();
            userResponse.token = token;
            return userResponse;
        } catch (error) {
            throw new Error(`Error signing in user: ${error.message}`);
        }
    }

    async getUserDashboardData(userId) {
        try {
            const allBlogs = await this.blogRepository.findAllBlogsOfUser(userId);
            const recentBlogs = allBlogs.slice(0, 5).sort((a, b) => b.createdAt - a.createdAt);

            const blogsCount = allBlogs.length;
            const commentsCount = await this.commentRepository.getCommentsCount(userId, allBlogs.map(blog => blog._id));
            
            return { recentBlogs, blogsCount, commentsCount };
        } catch (error) {
            throw new Error(`Error fetching user dashboard data: ${error.message}`);
        }
    }
}

export default UserService;