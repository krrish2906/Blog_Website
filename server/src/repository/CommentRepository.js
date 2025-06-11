import CrudRepository from "./CrudRepository.js";
import Comment from "../models/Comment.js";

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }

    async getBlogComments(blogId) {
        try {
            const comments = await Comment.find({
                blog: blogId,
                isApproved: true
            }).populate('user').sort({ createdAt: -1 });
            return comments;
        } catch (error) {
            throw new Error(`Error fetching comments for blog ${blogId}: ${error.message}`);
        }
    }

    async approve(commentId) {
        try {
            const comment = await Comment.findByIdAndUpdate(commentId, { isApproved: true }, { new: true });
            return comment;
        } catch (error) {
            throw new Error(`Error approving comment ${commentId}: ${error.message}`);
        }
    }

    async deleteAllCommentsOfBlog(blogId) {
        try {
            const response = await Comment.deleteMany({ blog: blogId });
            return response;
        } catch (error) {
            throw new Error(`Error deleting comments: ${error.message}`);
        }
    }

    async getCommentsCount(blogIds) {
        try {
            // Recieved comments
            const commentsCount = await Comment.countDocuments({ 
                blog: { $in: blogIds }
            });
            return commentsCount;
        } catch (error) {
            throw new Error(`Error fetching comments count: ${error.message}`);
        }
    }

    async getAllCommentsForUserBlogs(blogIds) {
        try {
            const comments = await Comment.find({
                blog: { $in: blogIds }
            }).populate('user').populate('blog').sort({ createdAt: -1 });
            return comments;
        } catch (error) {
            throw new Error(`Error fetching all comments for user's blogs: ${error.message}`);
        }
    }
}

export default CommentRepository;