import BlogRepository from "../repository/BlogRepository.js";
import CommentRepository from "../repository/CommentRepository.js";
import { uploadImage, imageURL } from '../utils/imagekitUtils.js'

class BlogService {
    constructor() {
        this.blogRepository = new BlogRepository();
        this.commentRepository = new CommentRepository();
    }

    async createBlog(data) {
        try {
            // Upload image to ImageKit
            const response = await uploadImage(data.image.buffer, data.image.originalname);
            const image = imageURL(response.filePath);
            
            // Create blog with image URL
            const blogData = { ...data, image };
            const blog = await this.blogRepository.create(blogData);
            return blog;
        } catch (error) {
            throw new Error(`Error creating blog: ${error.message}`);
        }
    }

    async getBlogById(blogId) {
        try {
            const blog = await this.blogRepository.findById(blogId);
            if(!blog) {
                throw new Error("Blog not found");
            }
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
    
    async getAllPublishedBlogs() {
        try {
            const blogs = await this.blogRepository.findAllPublishedBlogs();
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
            await this.commentRepository.deleteAllCommentsOfBlog(blogId);
            return result;
        } catch (error) {
            throw new Error(`Error deleting blog: ${error.message}`);
        }
    }

    async togglePublishStatus(blogId) {
        try {
            const blog = await this.blogRepository.findById(blogId);
            if(!blog) {
                throw new Error("Blog not found");
            }
            blog.isPublished = !blog.isPublished;
            await blog.save();
            return blog;
        } catch (error) {
            throw new Error(`Error toggling publish status: ${error.message}`);
        }
    }
}

export default BlogService;