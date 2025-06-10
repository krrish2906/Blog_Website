import CrudRepository from "./CrudRepository.js";
import Blog from '../models/Blog.js';

class BlogRepository extends CrudRepository {
    constructor() {
        super(Blog);
    }

    async findAllPublishedBlogs() {
        try {
            const blogs = await Blog.find({ isPublished: true });
            return blogs;
        } catch (error) {
            throw new Error(`Error fetching published blogs: ${error.message}`);
        }
    }
    
    async findAllBlogsOfUser(userId) {
        try {
            const blogs = await Blog.find({ author: userId });
            return blogs;
        } catch (error) {
            throw new Error(`Error fetching user blogs: ${error.message}`);
        }
    }
    
    async getBlogsCount(userId) {
        try {
            const blogsCount = await Blog.countDocuments({ author: userId });
            return blogsCount;
        } catch (error) {
            throw new Error(`Error fetching blogs count: ${error.message}`);
        }
    }
}

export default BlogRepository;