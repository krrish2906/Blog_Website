import UserRepository from "../repository/UserRepository.js";
import { hashPassword, generateToken } from '../utils/passwordUtils.js';

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
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

    async signin() {
        
    }
}

export default UserService;