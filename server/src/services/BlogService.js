import BlogRepository from "../repository/BlogRepository.js";

class BlogService {
    constructor() {
        this.blogRepository = new BlogRepository();
    }

    async createBlog(data) {
        try {
            const blog = await this.blogRepository.create(data);
            return blog;
        } catch (error) {
            throw new Error(`Error creating blog: ${error.message}`);
        }
    }

    async getBlogById(blogId) {
        try {
            const blog = await this.blogRepository.findById(blogId);
            return blog;
        } catch (error) {
            throw new Error(`Error fetching blog: ${error.message}`);
        }
    }

    async getAllBlogs() {
        try {
            const blogs = await this.blogRepository.findAll();
            return blogs;
        } catch (error) {
            throw new Error(`Error fetching all blogs: ${error.message}`);
        }
    }

    async deleteBlog(blogId) {
        try {
            const blog = await this.blogRepository.findById(blogId);
            if(!blog) {
                throw new Error("Blog not found");
            }
            const result = await this.blogRepository.destroy(blogId);
            return result;
        } catch (error) {
            throw new Error(`Error deleting blog: ${error.message}`);
        }
    }
}

export default BlogService;