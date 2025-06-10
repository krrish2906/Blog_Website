import dotenv from 'dotenv';
dotenv.config();

export const serverConfig = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    IMAGEKIT_URL: process.env.IMAGEKIT_URL,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
}