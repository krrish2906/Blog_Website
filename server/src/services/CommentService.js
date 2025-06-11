import CommentRepository from "../repository/CommentRepository.js";
import BlogRepository from "../repository/BlogRepository.js";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.blogRepository = new BlogRepository();
    }

    async create(commentData) {
        try {
            const comment = await this.commentRepository.create(commentData);
            return comment;
        } catch (error) {
            throw new Error(`Error creating comment: ${error.message}`);
        }
    }

    async getBlogComments(blogId) {
        try {
            const comments = await this.commentRepository.getBlogComments(blogId);
            return comments;
        } catch (error) {
            throw new Error(`Error fetching comments for blog ${blogId}: ${error.message}`);
        }
    }

    async deleteCommentById(commentId) {
        try {
            const comment = await this.commentRepository.destroy(commentId);
            return comment;
        } catch (error) {
            throw new Error(`Error deleting comment ${commentId}: ${error.message}`);
        }
    }

    async approveComment(commentId) {
        try {
            const comment = await this.commentRepository.approve(commentId);
            return comment;
        } catch (error) {
            throw new Error(`Error approving comment ${commentId}: ${error.message}`);
        }
    }

    async getAllCommentsForUserBlogs(userId) {
        try {
            // First get all published blogs of the user
            const publishedBlogs = await this.blogRepository.findByParameter({
                author: userId,
                isPublished: true
            });
            
            // Get all comments for these blogs
            const blogIds = publishedBlogs.map(blog => blog._id);
            const comments = await this.commentRepository.getAllCommentsForUserBlogs(blogIds);
            return comments;
        } catch (error) {
            throw new Error(`Error fetching all comments for user's blogs: ${error.message}`);
        }
    }
}

export default CommentService;