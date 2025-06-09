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
}

export default BlogRepository;